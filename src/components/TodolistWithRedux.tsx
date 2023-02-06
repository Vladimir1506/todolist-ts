import React, {memo, useCallback, useMemo} from 'react';
import {FilterValueType, TasksArrayType, TaskType, TodoListType} from '../AppWithRedux';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from 'react-redux';
import {addTaskAC} from '../state/reducers/tasks-reducer';
import {changeFilterAC, deleteTodolistAC, updateTodolistAC} from '../state/reducers/todo-lists-reducer';
import TaskWithRedux from './TaskWithRedux';
import {AppRootStateType} from '../state/store';

type TodolistWithReduxPropsType = { todolist: TodoListType }
export const TodolistWithRedux = memo(({todolist}: TodolistWithReduxPropsType) => {
    const tasks = useSelector<AppRootStateType, TasksArrayType>(state => state.tasks[todolist.id])

    console.log('TodolistWithRedux ' + todolist.title)
    const dispatch = useDispatch()
    let filteredTasksWithRedux = useMemo(() => {
        console.log('filteredTasksWithRedux useMemo')
        if (todolist.filter === 'Active') return tasks.filter((task: TaskType) => !task.isDone)
        if (todolist.filter === 'Completed') return tasks.filter((task: TaskType) => task.isDone)
        return tasks
    }, [tasks, todolist.filter])


    const changeFilter = useCallback((todoListId: string, value: FilterValueType) => dispatch(changeFilterAC(todoListId, value)), [dispatch])
    const mappedTasks = filteredTasksWithRedux.length ?
        <ul>{filteredTasksWithRedux.map((task: TaskType) =>
            <TaskWithRedux key={task.taskId} task={task} todolistId={todolist.id}/>
        )} </ul> :
        <span>{todolist.filter === 'All' ? 'No tasks' : `No ${todolist.filter} tasks`}</span>

    const onAllClickHandler = useCallback(() => changeFilter(todolist.id, 'All'), [changeFilter, todolist.id])
    const onActiveClickHandler = useCallback(() => changeFilter(todolist.id, 'Active'), [changeFilter, todolist.id])
    const onCompletedClickHandler = useCallback(() => changeFilter(todolist.id, 'Completed'), [changeFilter, todolist.id])

    const onDeleteTodolistButtonHandler = useCallback(() => dispatch(deleteTodolistAC(todolist.id)), [dispatch, todolist.id])
    const addTask = useCallback((taskTitle: string) => dispatch(addTaskAC(todolist.id, taskTitle)), [dispatch, todolist.id])
    const updateTodoListTitle = useCallback((newTodolistTitle: string) => dispatch(updateTodolistAC(todolist.id, newTodolistTitle)), [dispatch, todolist.id])
    return (<div>
        <h3>
            <EditableSpan title={todolist.title} spanCallback={updateTodoListTitle}/>
            <IconButton aria-label="delete" size="large" onClick={onDeleteTodolistButtonHandler}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </h3>

        <AddItemForm addItem={addTask}/>
        {mappedTasks}
        <div>
            <ButtonWithMemo value={'All'} variant={todolist.filter === 'All' ? 'contained' : 'outlined'}
                            callback={onAllClickHandler}/>
            <ButtonWithMemo value={'Active'} variant={todolist.filter === 'Active' ? 'contained' : 'outlined'}
                            callback={onActiveClickHandler}/>
            <ButtonWithMemo value={'Completed'} variant={todolist.filter === 'Completed' ? 'contained' : 'outlined'}
                            callback={onCompletedClickHandler}/>
        </div>
    </div>)
})
type ButtonWithMemoPropsType = {
    variant: 'text' | 'outlined' | 'contained'
    value: FilterValueType
    callback: () => void
}
const ButtonWithMemo = memo(({variant, value, callback}: ButtonWithMemoPropsType) => {
    console.log('render ' + value)
    return <Button variant={variant} size="small"
                   onClick={callback}>
        {value}
    </Button>
})

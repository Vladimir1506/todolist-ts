import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {addTaskTC, fetchTasksTC} from '../bll/reducers/tasks-reducer/tasks-reducer';
import {
    FilterValueType,
    removeTodolistTC,
    updateTodoTitleTC
} from '../bll/reducers/todolists-reducer/todo-lists-reducer';
import TaskWithRedux from './TaskWithRedux';
import {useAppDispatch, useAppSelector} from '../bll/store';
import {TodolistDomainType} from '../api/todolist-api';
import {TaskDomainType, TasksDomainArrayType, TaskStatuses} from '../api/task-api';

type TodolistWithReduxPropsType = { todolist: TodolistDomainType }

export const TodolistWithRedux = memo(({todolist}: TodolistWithReduxPropsType) => {
    const [filter, setFilter] = useState<FilterValueType>('All')
    const tasks = useAppSelector<TasksDomainArrayType>(state => state.tasks[todolist.id])
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(todolist.id))
    }, [dispatch, todolist.id])
    let filteredTasksWithRedux = useMemo(() => {
        if (filter === 'Active') return tasks.filter((task: TaskDomainType) => task.status === TaskStatuses.New)
        if (filter === 'Completed') return tasks.filter((task: TaskDomainType) => task.status === TaskStatuses.Completed)
        return tasks
    }, [tasks, filter])

    const mappedTasks = filteredTasksWithRedux.length ?
        <ul>{filteredTasksWithRedux.map((task: TaskDomainType) =>
            <TaskWithRedux key={task.id} task={task} todolistId={todolist.id}/>
        )} </ul> :
        <span>{filter === 'All' ? 'No tasks' : `No ${filter} tasks`}</span>
    const onAllClickHandler = () => setFilter('All')
    const onActiveClickHandler = () => setFilter('Active')
    const onCompletedClickHandler = () => setFilter('Completed')

    const onDeleteTodolistButtonHandler = useCallback(() => dispatch(removeTodolistTC(todolist.id)), [dispatch, todolist.id])
    const addTask = useCallback((taskTitle: string) => dispatch(addTaskTC(todolist.id, taskTitle)), [dispatch, todolist.id])
    const updateTodoListTitle = useCallback((newTodolistTitle: string) => dispatch(updateTodoTitleTC(todolist.id, newTodolistTitle)), [dispatch, todolist.id])
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
            <ButtonWithMemo value={'All'} variant={filter === 'All' ? 'contained' : 'outlined'}
                            callback={onAllClickHandler}/>
            <ButtonWithMemo value={'Active'} variant={filter === 'Active' ? 'contained' : 'outlined'}
                            callback={onActiveClickHandler}/>
            <ButtonWithMemo value={'Completed'} variant={filter === 'Completed' ? 'contained' : 'outlined'}
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

    return <Button variant={variant} size="small"
                   onClick={callback}>
        {value}
    </Button>
})

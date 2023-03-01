import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {addTaskTC, fetchTasksTC} from '../bll/reducers/tasks-reducer/tasks-reducer';
import {
    FilterValueType,
    removeTodolistTC,
    updateTodoTitleTC
} from '../bll/reducers/todolists-reducer/todo-lists-reducer';
import Task from './Task';
import {useAppDispatch, useAppSelector} from '../bll/store';
import {TodolistDomainType} from '../api/todolist-api';
import {TaskDomainType, TasksDomainArrayType, TaskStatuses} from '../api/task-api';
import {LoadingStatuses} from '../bll/reducers/app-reducer/app-reducer';

type TodolistWithReduxPropsType = { todolist: TodolistDomainType }

export const Todolist = memo(({todolist}: TodolistWithReduxPropsType) => {
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
            <Task key={task.id} task={task} todolistId={todolist.id}
                  disabled={
                      task.entityStatus === LoadingStatuses.LOADING ||
                      todolist.entityStatus === LoadingStatuses.LOADING
                  }/>
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
            <EditableSpan title={todolist.title} spanCallback={updateTodoListTitle}
                          disabled={todolist.entityStatus === LoadingStatuses.LOADING}/>
            <IconButton disabled={todolist.entityStatus === LoadingStatuses.LOADING} aria-label="delete" size="large"
                        onClick={onDeleteTodolistButtonHandler}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </h3>

        <AddItemForm addItem={addTask} disabled={todolist.entityStatus === LoadingStatuses.LOADING}/>
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

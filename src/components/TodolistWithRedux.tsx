import React, {ChangeEvent} from 'react';
import {FilterValueType, TasksArrayType, TaskType, TodoListType} from '../AppWithRedux';
import Input from './Input';
import EditableSpan from './EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {addTaskAC, changeTaskStatusAC, removeTasksAC, updateTasksAC} from '../state/reducers/tasks-reducer';
import {changeFilterAC, deleteTodolistAC, updateTodolistAC} from '../state/reducers/todo-lists-reducer';

type TodolistWithReduxPropsType = { todolist: TodoListType }
const getFilteredTasks = (tasks: TasksArrayType, filter: FilterValueType): TasksArrayType => {
    if (filter === 'Active') return tasks.filter((task: TaskType) => !task.isDone)
    if (filter === 'Completed') return tasks.filter((task: TaskType) => task.isDone)
    return tasks
}
export const TodolistWithRedux = ({todolist}: TodolistWithReduxPropsType) => {
    const tasks = useSelector<AppRootStateType, TasksArrayType>(state => state.tasks[todolist.id])
    const dispatch = useDispatch()
    const filteredTasksWithRedux = getFilteredTasks(tasks, todolist.filter)

    const deleteTodolist = (todoListId: string) => dispatch(deleteTodolistAC(todoListId))
    const removeTask = (todoListId: string, taskId: string) => dispatch(removeTasksAC(todoListId, taskId))
    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => dispatch(changeTaskStatusAC(todoListId, taskId, isDone))
    const changeFilter = (todoListId: string, value: FilterValueType) => dispatch(changeFilterAC(todoListId, value))
    const mappedTasks = filteredTasksWithRedux.length ? <ul>{filteredTasksWithRedux.map((task: TaskType) => {
            const removeTaskHandler = () => removeTask(todolist.id, task.id)
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolist.id, task.id, e.currentTarget.checked)
            const updateTaskTitle = (title: string) => dispatch(updateTasksAC(todolist.id, task.id, title))
            return (<div key={task.id}>
                    <Checkbox
                        onChange={changeTaskStatusHandler}
                        checked={task.isDone}/>
                    <span className={task.isDone ? 'task-done' : ''}>
                        <EditableSpan title={task.title} spanCallback={updateTaskTitle} disabled={task.isDone}/>
                    </span>
                    <IconButton onClick={removeTaskHandler} aria-label="delete" size="small" disabled={task.isDone}>
                        <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                </div>
            )
        }
    )} </ul> : <span>{todolist.filter === 'All' ? 'No tasks' : `No ${todolist.filter} tasks`}</span>

    const onClickHandlerCreator = (filter: FilterValueType) => () => changeFilter(todolist.id, filter)
    const onDeleteTodolistButtonHandler = () => deleteTodolist(todolist.id)
    const addTask = (taskTitle: string) => dispatch(addTaskAC(todolist.id, taskTitle))
    const updateTodoListTitle = (newTodolistTitle: string) => dispatch(updateTodolistAC(todolist.id, newTodolistTitle))
    return (<div>
        <h3>
            <EditableSpan title={todolist.title} spanCallback={updateTodoListTitle}/>
            <IconButton aria-label="delete" size="large" onClick={onDeleteTodolistButtonHandler}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </h3>

        <Input addCallback={addTask}/>
        {mappedTasks}
        <div>
            <Button variant={todolist.filter === 'All' ? 'contained' : 'outlined'} size="small"
                    onClick={onClickHandlerCreator('All')}>
                All
            </Button>
            <Button variant={todolist.filter === 'Active' ? 'contained' : 'outlined'} size="small"
                    onClick={onClickHandlerCreator('Active')}>
                Active
            </Button>
            <Button variant={todolist.filter === 'Completed' ? 'contained' : 'outlined'} size="small"
                    onClick={onClickHandlerCreator('Completed')}>
                Completed
            </Button>
        </div>
    </div>)
}


import React, {ChangeEvent} from 'react';
import {FilterValueType, TasksArrayType, TaskType} from '../AppWithRedux';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Task from './Task';

type TodolistPropsType = {
    id: string
    title: string
    tasks: TasksArrayType
    filter: FilterValueType
    removeTask: (todoListId: string, id: string) => void
    changeFilter: (id: string, value: FilterValueType) => void
    addTask: (todoListId: string, name: string) => void
    changeTaskStatus: (todoListId: string, id: string, isDone: boolean) => void
    deleteTodolist: (todoListId: string) => void
    updateTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
    updateTodoListTitle: (todoListId: string, newTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const tasks = props.tasks.length ? <ul>{props.tasks.map((task: TaskType) => {
            const removeTaskHandler = () => props.removeTask(props.id, task.taskId)
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.id, task.taskId, e.currentTarget.checked)
            const updateTaskTitle = (title: string) => {
                props.updateTaskTitle(props.id, task.taskId, title)
            }
            return (
                <Task task={task} changeTaskStatus={changeTaskStatusHandler}
                      updateTaskTitle={updateTaskTitle} removeTask={removeTaskHandler}/>    // <div key={task.taskId}//     <Checkbox
                //         onChange={changeTaskStatusHandler}
                //         checked={task.isDone}/>
                //     <span className={task.isDone ? 'task-done' : ''}>
                //         <EditableSpan title={task.title} spanCallback={updateTaskTitle} disabled={task.isDone}/>
                //     </span>
                //     <IconButton onClick={removeTaskHandler} aria-label="delete" size="small" disabled={task.isDone}>
                //         <DeleteIcon fontSize="inherit"/>
                //     </IconButton>
                // </div>
            )
        }
    )} </ul> : <span>{props.filter === 'All' ? 'No tasks' : `No ${props.filter} tasks`}</span>

    const onClickHandlerCreator = (filter: FilterValueType) => () => props.changeFilter(props.id, filter)
    const onDeleteTodolistButtonHandler = () => props.deleteTodolist(props.id)
    const addTask = (taskTitle: string) => props.addTask(props.id, taskTitle)
    const updateTodoListTitle = (newTodolistTitle: string) => props.updateTodoListTitle(props.id, newTodolistTitle)
    return (<div>
        <h3>
            <EditableSpan title={props.title} spanCallback={updateTodoListTitle}/>
            <IconButton aria-label="delete" size="large" onClick={onDeleteTodolistButtonHandler}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </h3>

        <AddItemForm addItem={addTask}/>
        {tasks}
        <div>
            <Button variant={props.filter === 'All' ? 'contained' : 'outlined'} size="small"
                    onClick={onClickHandlerCreator('All')}>
                All
            </Button>
            <Button variant={props.filter === 'Active' ? 'contained' : 'outlined'} size="small"
                    onClick={onClickHandlerCreator('Active')}>
                Active
            </Button>
            <Button variant={props.filter === 'Completed' ? 'contained' : 'outlined'} size="small"
                    onClick={onClickHandlerCreator('Completed')}>
                Completed
            </Button>
        </div>
    </div>)
}


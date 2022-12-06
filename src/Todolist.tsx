import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TasksArrayType, TaskType} from './App';


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
}

export const Todolist = (props: TodolistPropsType) => {
    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const tasks = props.tasks.length ? <ul>{props.tasks.map((task: TaskType) => {
            const removeTaskHandler = () => props.removeTask(props.id, task.id)
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.id, task.id, e.currentTarget.checked)
            return (
                <li key={task.id}>
                    <input type="checkbox"
                           onChange={changeTaskStatusHandler}
                           checked={task.isDone}/>
                    <span className={task.isDone ? 'task-done' : ''}>{task.title} </span>
                    <button onClick={removeTaskHandler}>✖</button>
                </li>
            )
        }
    )} </ul> : <span>{props.filter === 'All' ? 'No tasks' : `No ${props.filter} tasks`}</span>

    const addTaskHandler = () => {
        if (inputValue.trim() !== '') {
            props.addTask(props.id, inputValue)
        } else setError(true)
        setInputValue('')
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && addTaskHandler()
    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const currentInputValue = event.currentTarget.value
        error && currentInputValue.trim().length && setError(false)
        setInputValue(currentInputValue)
    }
    const errorMessage = error &&
        <div style={{fontWeight: 'bold', color: 'red'}}>Please, enter non-empty task title</div>
    const onClickHandlerCreator = (filter: FilterValueType) => () => props.changeFilter(props.id, filter)
    const onDeleteTodolistButtonHandler = () => props.deleteTodolist(props.id)
    return (<div>
        <h3>{props.title}
            <button onClick={onDeleteTodolistButtonHandler}>✖
            </button>
        </h3>


        <div>
            <input
                className={error ? 'input-error' : ''}
                value={inputValue}
                onChange={onChangeInputValueHandler}
                onKeyDown={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
            {errorMessage}
        </div>
        {tasks}
        <div>
            <button className={props.filter === 'All' ? 'btn-active' : ''} onClick={onClickHandlerCreator('All')}>All
            </button>
            <button className={props.filter === 'Active' ? 'btn-active' : ''}
                    onClick={onClickHandlerCreator('Active')}>Active
            </button>
            <button className={props.filter === 'Completed' ? 'btn-active' : ''}
                    onClick={onClickHandlerCreator('Completed')}>Completed
            </button>
        </div>
    </div>)
}


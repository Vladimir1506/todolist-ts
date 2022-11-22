import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterValueType} from './App';

type TodolistPropsType = {
    title: string,
    tasks: TasksArrayType,
    removeTask: (id: string) => void,
    changeFilter: (value: filterValueType) => void,
    addTask: (name: string) => void
}
export type TasksArrayType = Array<TaskType>
export type TaskType = {
    id: string, title: string, isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    const [inputValue, setInputValue] = useState<string>('')
    const tasks = props.tasks.map((task: TaskType) => {
        const removeTaskHandler = () => props.removeTask(task.id)
        return (
            <li key={task.id}><input type="checkbox" checked={task.isDone}/>
                <span>{task.title} </span>
                <button onClick={removeTaskHandler}>✖</button>
            </li>
        )
    })

    const addTaskHandler = () => {
        if (inputValue.trim() !== '') {
            props.addTask(inputValue)
        }
        setInputValue('')
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') addTaskHandler()
    }
    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => setInputValue(event.currentTarget.value)
    const onClickHandlerCreator = (filter: filterValueType) => () => props.changeFilter(filter)
    return (<div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={inputValue}
                onChange={onChangeInputValueHandler}
                onKeyDown={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {tasks}
        </ul>
        <div>
            <button onClick={onClickHandlerCreator('All')}>All</button>
            <button onClick={onClickHandlerCreator('Active')}>Active</button>
            <button onClick={onClickHandlerCreator('Completed')}>Completed</button>
        </div>
    </div>)
}


import React from "react";
import {filterValueType} from "./App";

type TodolistPropsType = {
    title: string, tasks: TasksArrayType,
    removeTask: (id: number) => void,
    changeFilter: (value: filterValueType) => void,
}
export type TasksArrayType = Array<TaskType>
export type TaskType = {
    id: number, title: string, isDone: boolean
}

export const Todolist = (props: TodolistPropsType) =>
    (<div>
        <h3>{props.title}</h3>
        <div>
            <input type="text"/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map((task: TaskType) => {
                return (
                    <li key={task.id}><input type="checkbox" checked={task.isDone}/>
                        <span>{task.title} </span>
                        <button onClick={() => props.removeTask(task.id)}>✖</button>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={() => props.changeFilter('All')}>All</button>
            <button onClick={() => props.changeFilter('Active')}>Active</button>
            <button onClick={() => props.changeFilter('Completed')}>Completed</button>
        </div>
    </div>)


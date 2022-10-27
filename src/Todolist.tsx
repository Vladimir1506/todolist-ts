import React from "react";

type propsType = { title: string, tasks: TasksPropsType }
type TasksPropsType = Array<TaskType>
export type TaskType = {
    id: number, title: string, isDone: boolean
}

export function Todolist(props: propsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input type="text"/>
            <button>+</button>
        </div>
        <ul>
            <li><input type="checkbox" checked={true}/><span>CSS&HTML</span></li>
            <li><input type="checkbox" checked={true}/><span>JS</span></li>
            <li><input type="checkbox"/><span>React</span></li>
            <li><input type="checkbox"/><span>React</span></li>
        </ul>
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>
}

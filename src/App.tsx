import React, {useState} from 'react';
import './App.css';
import {TasksArrayType, TaskType, Todolist} from "./Todolist";

export type filterValueType = 'All' | 'Active' | 'Completed'

function App() {
    let learnTasks: TasksArrayType = [
        {id: 1, title: 'CSS&HTML', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Rest API', isDone: false},
        {id: 5, title: 'GraphQL', isDone: false},
    ]
    let [tasks, setTasks] = useState<TasksArrayType>(learnTasks)
    let [filter, setFilter] = useState<filterValueType>('All')

    let tasksForTodoList = tasks
    if (filter === 'Active') tasksForTodoList = tasks.filter((task: TaskType) => !task.isDone)
    if (filter === 'Completed') tasksForTodoList = tasks.filter((task: TaskType) => task.isDone)
    const changeFilter = (value: filterValueType) => {
        setFilter(value)
    }
    const removeTask = (id: number) => {
        const filteredTasks = tasks.filter((task: TaskType) => task.id !== id)
        setTasks(filteredTasks)
    }

    return (<div className="App">
            <Todolist title='What to learn?' tasks={tasksForTodoList} changeFilter={changeFilter}
                      removeTask={removeTask}/>
        </div>
    );
}

export default App;

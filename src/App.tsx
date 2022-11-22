import React, {useState} from 'react';
import './App.css';
import {TasksArrayType, TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type filterValueType = 'All' | 'Active' | 'Completed'

function App() {
    const learnTasks: TasksArrayType = [
        {id: v1(), title: 'CSS&HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ]
    const [tasks, setTasks] = useState<TasksArrayType>(learnTasks)
    const [filter, setFilter] = useState<filterValueType>('All')

    const getFilteredTasks = (tasks: TasksArrayType, filter: filterValueType): TasksArrayType => {
        if (filter === 'Active') return tasks.filter((task: TaskType) => !task.isDone)
        if (filter === 'Completed') return tasks.filter((task: TaskType) => task.isDone)
        return tasks
    }

    const changeFilter = (value: filterValueType) => setFilter(value)
    const removeTask = (id: string) => {
        const filteredTasks = tasks.filter((task: TaskType) => task.id !== id)
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => setTasks([{id: v1(), title, isDone: false}, ...tasks])

    return (
        <div className="App">
            <Todolist title="What to learn?"
                      addTask={addTask}
                      tasks={getFilteredTasks(tasks, filter)}
                      changeFilter={changeFilter}
                      removeTask={removeTask}/>
        </div>);
}

export default App;

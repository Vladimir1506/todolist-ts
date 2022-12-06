import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValueType = 'All' | 'Active' | 'Completed'
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType
}
export type TasksType = { [id: string]: TasksArrayType }
export type TasksArrayType = Array<TaskType>
export type TaskType = { id: string, title: string, isDone: boolean }
const todoListID1 = v1()
const todoListID2 = v1()
const initTodoLists: Array<TodoListType> = [
    {id: todoListID1, title: 'What to learn', filter: 'All'},
    {id: todoListID2, title: 'What to do', filter: 'All'},
]

const initTasks: TasksType = {
    [todoListID1]:
        [{id: v1(), title: 'CSS&HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},],
    [todoListID2]:
        [{id: v1(), title: 'Cleaning', isDone: true},
            {id: v1(), title: 'Workout', isDone: true},
            {id: v1(), title: 'Sleeping', isDone: false},
            {id: v1(), title: 'Lunch', isDone: false},
            {id: v1(), title: 'Walking in the rain', isDone: false},],
}

const getFilteredTasks = (tasks: TasksArrayType, filter: FilterValueType): TasksArrayType => {
    if (filter === 'Active') return tasks.filter((task: TaskType) => !task.isDone)
    if (filter === 'Completed') return tasks.filter((task: TaskType) => task.isDone)
    return tasks
}

export const App = () => {
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>(initTodoLists)
    const [tasks, setTasks] = useState<TasksType>(initTasks)

    const changeFilter = (todoListId: string, value: FilterValueType) => {
        const foundedTodoList = todoLists.find((todoList) => todoList.id === todoListId)
        foundedTodoList && (foundedTodoList.filter = value) && setTodoLists([...todoLists])
    }
    const removeTask = (todoListId: string, id: string) => {
        tasks[todoListId] = tasks[todoListId].filter((task: TaskType) => task.id !== id)
        setTasks({...tasks})
    }
    const addTask = (todoListId: string, title: string) => {
        tasks[todoListId].push({id: v1(), title, isDone: false})
        setTasks({...tasks})
    }
    const changeTaskStatus = (todoListId: string, id: string, isDone: boolean) => setTasks({
        ...tasks, [todoListId]: tasks[todoListId].map((task: TaskType) => task.id === id ? {
            ...task, isDone
        } : task)
    })
    const deleteTodolist = (todoListId: string) => {
        setTodoLists(todoLists.filter(todoList => todoList.id !== todoListId))
        delete tasks[todoListId]
    }
    const mappedTodoLists = todoLists.map((todoList) =>
        <Todolist
            key={todoList.id}
            id={todoList.id}
            title={todoList.title}
            filter={todoList.filter}
            addTask={addTask}
            tasks={getFilteredTasks(tasks[todoList.id], todoList.filter)}
            changeFilter={changeFilter}
            removeTask={removeTask}
            changeTaskStatus={changeTaskStatus}
            deleteTodolist={deleteTodolist}
        />
    )

    return (
        <div className="App">
            {mappedTodoLists}
        </div>);
}

export default App;

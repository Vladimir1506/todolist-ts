import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import Input from './components/Input';
import ButtonAppBar from './components/AppBar';
import {Container, Grid, Paper} from '@mui/material';
import {
    createAddTasksAC,
    createChangeTaskStatusAC,
    createRemoveTasksAC,
    createUpdateTasksAC,
    tasksReducer
} from './reducers/tasks-reducer';
import {
    addTodolistAC,
    changeFilterAC,
    deleteTodolistAC,
    todoListsReducer,
    updateTodolistAC
} from './reducers/todo-lists-reducer';

export type FilterValueType = 'All' | 'Active' | 'Completed'
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType
}
export type TodoListsType = Array<TodoListType>
export type TasksType = { [id: string]: TasksArrayType }
export type TasksArrayType = Array<TaskType>
export type TaskType = { id: string, title: string, isDone: boolean }

const todoListID1 = v1()
const todoListID2 = v1()

const initTodoLists: TodoListsType = [
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
    const [todoLists, dispatchTodolist] = useReducer(todoListsReducer, initTodoLists)
    const [tasks, dispatchTasks] = useReducer(tasksReducer, initTasks)

    const addTodolist = (todolistName: string) => dispatchTodolist(addTodolistAC(dispatchTasks, v1(), todolistName))
    const updateTodoListTitle = (todoListId: string, newTitle: string) => dispatchTodolist(updateTodolistAC(todoListId, newTitle))
    const deleteTodolist = (todoListId: string) => dispatchTodolist(deleteTodolistAC(dispatchTasks, todoListId))
    const addTask = (todoListId: string, title: string) => dispatchTasks(createAddTasksAC(todoListId, title))
    const updateTaskTitle = (todoListId: string, taskId: string, newTitle: string) => dispatchTasks(createUpdateTasksAC(todoListId, taskId, newTitle))
    const removeTask = (todoListId: string, taskId: string) => dispatchTasks(createRemoveTasksAC(todoListId, taskId))
    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => dispatchTasks(createChangeTaskStatusAC(todoListId, taskId, isDone))
    const changeFilter = (todoListId: string, value: FilterValueType) => dispatchTodolist(changeFilterAC(todoListId, value))

    const mappedTodoLists = todoLists.map((todoList: TodoListType) => {
            const todoListId = todoList.id
            return <Grid key={todoListId} item>
                <Paper style={{padding: '10px'}}>
                    <Todolist
                        id={todoListId}
                        title={todoList.title}
                        filter={todoList.filter}
                        addTask={addTask}
                        tasks={getFilteredTasks(tasks[todoList.id], todoList.filter)}
                        changeFilter={changeFilter}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        deleteTodolist={deleteTodolist}
                        updateTaskTitle={updateTaskTitle}
                        updateTodoListTitle={updateTodoListTitle}
                    />
                </Paper>
            </Grid>
        }
    )

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <Input addCallback={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {mappedTodoLists}
                </Grid>
            </Container>

        </div>);
}

export default App;

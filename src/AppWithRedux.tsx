import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import Input from './components/Input';
import ButtonAppBar from './components/AppBar';
import {Container, Grid, Paper} from '@mui/material';
import {addTaskAC, changeTaskStatusAC, removeTasksAC, updateTasksAC} from './state/reducers/tasks-reducer';
import {addTodolistAC, changeFilterAC, deleteTodolistAC, updateTodolistAC} from './state/reducers/todo-lists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type FilterValueType = 'All' | 'Active' | 'Completed'
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType
}
export type TaskType = { id: string, title: string, isDone: boolean }
export type TasksArrayType = Array<TaskType>
export type TasksType = { [id: string]: TasksArrayType }
export type TodoListsType = Array<TodoListType>

const getFilteredTasks = (tasks: TasksArrayType, filter: FilterValueType): TasksArrayType => {
    if (filter === 'Active') return tasks.filter((task: TaskType) => !task.isDone)
    if (filter === 'Completed') return tasks.filter((task: TaskType) => task.isDone)
    return tasks
}

export const AppWithRedux = () => {
    const todoLists = useSelector<AppRootStateType, TodoListsType>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch = useDispatch()
    const addTodolist = (todolistName: string) => {
        const action = addTodolistAC(todolistName)
        dispatch(action)
    }
    const deleteTodolist = (todoListId: string) => {
        const action = deleteTodolistAC(todoListId)
        dispatch(action)
    }
    const updateTodoListTitle = (todoListId: string, newTitle: string) => dispatch(updateTodolistAC(todoListId, newTitle))

    const addTask = (todoListId: string, title: string) => dispatch(addTaskAC(todoListId, title))
    const updateTaskTitle = (todoListId: string, taskId: string, newTitle: string) => dispatch(updateTasksAC(todoListId, taskId, newTitle))
    const removeTask = (todoListId: string, taskId: string) => dispatch(removeTasksAC(todoListId, taskId))
    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => dispatch(changeTaskStatusAC(todoListId, taskId, isDone))
    const changeFilter = (todoListId: string, value: FilterValueType) => dispatch(changeFilterAC(todoListId, value))

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

export default AppWithRedux;

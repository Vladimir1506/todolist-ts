import React, {useCallback, useEffect} from 'react';
import './App.css';
import AddItemForm from './components/AddItemForm';
import ButtonAppBar from './components/AppBar';
import {Container, Grid, Paper} from '@mui/material';
import {addTodolistTC, fetchTodolistsTC} from './bll/reducers/todolists-reducer/todo-lists-reducer';
import {useAppDispatch, useAppSelector} from './bll/store';
import {TodolistWithRedux} from './components/TodolistWithRedux';
import {TodolistDomainType, TodolistsArrayDomainType} from './api/todolist-api';

// export type TodoListType = {
//     id: string,
//     title: string,
//     filter: FilterValueType
// }
// export type TaskType = { taskId: string, title: string, isDone: boolean }
// export type TasksArrayType = Array<TaskType>
// export type TodoListsType = Array<TodoListType>

export const AppWithRedux = () => {
    const todoLists = useAppSelector<TodolistsArrayDomainType>(state => state.todolists)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])
    const addTodolist = useCallback((todolistName: string) => dispatch(addTodolistTC(todolistName)), [dispatch])
    const mappedTodoLists = todoLists.map((todoList: TodolistDomainType) => {
            const todoListId = todoList.id
            return <Grid key={todoListId} item>
                <Paper style={{padding: '10px'}}>
                    <TodolistWithRedux todolist={todoList}/>
                </Paper>
            </Grid>
        }
    )
    return (<div className="App">
        <ButtonAppBar/>
        <Container fixed>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={5}>
                {mappedTodoLists}
            </Grid>
        </Container>
    </div>);
}

export default AppWithRedux;

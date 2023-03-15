import React, {useCallback, useEffect} from 'react';
import AddItemForm from './AddItemForm';
import Grid from '@mui/material/Grid';
import {addTodolistTC, fetchTodolistsTC} from '../bll/reducers/todolists-reducer/todo-lists-reducer';
import {TodolistDomainType, TodolistsArrayDomainType} from '../api/todolist-api';
import Paper from '@mui/material/Paper';
import {Todolist} from './Todolist';
import {useAppDispatch, useAppSelector} from '../bll/store';
import {Navigate} from 'react-router-dom';

const TodolistsList = () => {
    const dispatch = useAppDispatch()
    const todoLists = useAppSelector<TodolistsArrayDomainType>(state => state.todolists)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(fetchTodolistsTC())
    }, [dispatch, isLoggedIn])
    const addTodolist = useCallback((todolistName: string) => dispatch(addTodolistTC(todolistName)), [dispatch])
    const mappedTodoLists = todoLists.map((todoList: TodolistDomainType) => {
        const todoListId = todoList.id
        return <Grid key={todoListId} item>
            <Paper style={{padding: '10px'}}>
                <Todolist todolist={todoList}/>
            </Paper>
        </Grid>
    })
    if (!isLoggedIn) return <Navigate to={'login'}/>

    return (<>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={5}>
            {mappedTodoLists}
        </Grid>
    </>);
};

export default TodolistsList;
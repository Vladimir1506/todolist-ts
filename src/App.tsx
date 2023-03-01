import React, {useCallback, useEffect} from 'react';
import './App.css';
import AddItemForm from './components/AddItemForm';
import ButtonAppBar from './components/AppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';

import {addTodolistTC, fetchTodolistsTC} from './bll/reducers/todolists-reducer/todo-lists-reducer';
import {useAppDispatch, useAppSelector} from './bll/store';
import {Todolist} from './components/Todolist';
import {TodolistDomainType, TodolistsArrayDomainType} from './api/todolist-api';
import {LoadingStatuses} from './bll/reducers/app-reducer/app-reducer';
import ErrorSnackbar from './components/ErrorSnackbar/ErrorSnackbar';

export const App = () => {
    const todoLists = useAppSelector<TodolistsArrayDomainType>(state => state.todolists)
    const loadingStatus = useAppSelector<LoadingStatuses>(state => state.app.loadingStatus)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])
    const addTodolist = useCallback((todolistName: string) => dispatch(addTodolistTC(todolistName)), [dispatch])
    const mappedTodoLists = todoLists.map((todoList: TodolistDomainType) => {
            const todoListId = todoList.id
            return <Grid key={todoListId} item>
                <Paper style={{padding: '10px'}}>
                    <Todolist todolist={todoList}/>
                </Paper>
            </Grid>
        }
    )
    return (<div className="App">
        <ButtonAppBar/>
        <ErrorSnackbar/>
        {loadingStatus === LoadingStatuses.LOADING && <LinearProgress/>}
        <Container fixed>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}
                             // disabled={loadingStatus === LoadingStatuses.LOADING}
                />
            </Grid>
            <Grid container spacing={5}>
                {mappedTodoLists}
            </Grid>
        </Container>
    </div>);
}

export default App;

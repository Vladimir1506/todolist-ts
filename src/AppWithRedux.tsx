import React from 'react';
import './App.css';
import Input from './components/Input';
import ButtonAppBar from './components/AppBar';
import {Container, Grid, Paper} from '@mui/material';
import {addTodolistAC} from './state/reducers/todo-lists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TodolistWithRedux} from './components/TodolistWithRedux';

export type FilterValueType = 'All' | 'Active' | 'Completed'
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType
}
export type TaskType = { id: string, title: string, isDone: boolean }
export type TasksArrayType = Array<TaskType>
export type TodoListsType = Array<TodoListType>

export const AppWithRedux = () => {
    const todoLists = useSelector<AppRootStateType, TodoListsType>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodolist = (todolistName: string) => {
        const action = addTodolistAC(todolistName)
        dispatch(action)
    }

    const mappedTodoLists = todoLists.map((todoList: TodoListType) => {
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
                <Input addCallback={addTodolist}/>
            </Grid>
            <Grid container spacing={5}>
                {mappedTodoLists}
            </Grid>
        </Container>
    </div>);
}

export default AppWithRedux;

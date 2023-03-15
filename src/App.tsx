import React, {useEffect} from 'react';
import './App.css';
import AppBar from './components/AppBar';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {useAppDispatch, useAppSelector} from './bll/store';
import {initAppTC, LoadingStatuses} from './bll/reducers/app-reducer/app-reducer';
import ErrorSnackbar from './components/ErrorSnackbar/ErrorSnackbar';
import {Navigate, Route, Routes} from 'react-router-dom';
import TodolistsList from './components/TodolistsList';
import Login from './features/Login';
import CircularProgress from '@mui/material/CircularProgress';

export const App = () => {
    const loadingStatus = useAppSelector<LoadingStatuses>(state => state.app.loadingStatus)
    const isInitialized = useAppSelector<boolean>(state => state.app.initialized)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(initAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (<div className="App">
        <AppBar/>
        <ErrorSnackbar/>
        {loadingStatus === LoadingStatuses.LOADING && <LinearProgress/>}
        <Container fixed>
            <Routes>
                <Route path={''} element={<TodolistsList/>}/>
                <Route path={'login'} element={<Login/>}/>
                <Route path={'404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                <Route path={'*'} element={<Navigate to={'404'}/>}/>
            </Routes>
        </Container>
    </div>);
}

export default App;

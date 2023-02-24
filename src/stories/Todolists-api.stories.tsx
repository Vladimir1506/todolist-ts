import {useEffect, useState} from 'react';
import {todolistAPI} from '../api/todolist-api';

export default {
    title: 'API/TODOLISTS'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.getTodolists().then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistTitle = 'newTodolist' + new Date().getSeconds()
        todolistAPI.createTodolist(todolistTitle).then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const id = 'cbb28715-75ad-494d-a088-35f6dc5b366b'
    useEffect(() => {
        todolistAPI.deleteTodolist(id).then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const id = 'cbb28715-75ad-494d-a088-35f6dc5b366b'
    useEffect(() => {
        todolistAPI.updateTodolistTitle(id, 'newTitle').then(res => setState(res))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
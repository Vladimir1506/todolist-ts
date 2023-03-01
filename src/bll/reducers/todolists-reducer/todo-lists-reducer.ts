import {todolistAPI, TodolistDomainType, TodolistsArrayDomainType} from '../../../api/todolist-api';
import {AppRootStateType, AppThunk} from '../../store';
import {LoadingStatuses, setAppStatusAC} from '../app-reducer/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../utils/error-utils/utils';

export const ADD_TODOLIST = 'ADD_TODOLIST'
export const DELETE_TODOLIST = 'DELETE_TODOLIST'
const UPDATE_TODOLIST = 'UPDATE_TODOLIST'
const SET_TODO_ENTITY_STATUS = 'SET-TODO-ENTITY-STATUS'
export const SET_TODOLISTS = 'SET-TODOLISTS'
export type FilterValueType = 'All' | 'Active' | 'Completed'

export const todoListsReducer = (todoLists: TodolistsArrayDomainType = [], action: TodolistActionsType): TodolistsArrayDomainType => {
    switch (action.type) {
        case SET_TODOLISTS: {
            return action.payload.todolists.map(todoList => ({
                ...todoList,
                filter: 'All',
                entityStatus: LoadingStatuses.IDLE
            }))
        }
        case ADD_TODOLIST: {
            return [action.payload.todolist, ...todoLists]
        }
        case UPDATE_TODOLIST: {
            return todoLists.map(todoList =>
                todoList.id === action.payload.todoListId ? {
                    ...todoList,
                    title: action.payload.newTitle
                } : todoList)
        }
        case DELETE_TODOLIST: {
            return (todoLists.filter(todoList => todoList.id !== action.payload.todoListId))
        }
        case SET_TODO_ENTITY_STATUS:
            return todoLists.map(todo => todo.id === action.payload.todolistId ? {
                ...todo,
                entityStatus: action.payload.entityStatus
            } : todo)
        default:
            return todoLists
    }
}
export type TodolistActionsType =
    AddTodolistActionType
    | DeleteTodolistActionType
    | SetTodolistActionType
    | ReturnType<typeof updateTodolistAC>
    | ReturnType<typeof setTodoEntityStatusAC>

export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: Array<TodolistDomainType>) => ({
    type: SET_TODOLISTS,
    payload: {todolists}
}) as const

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist: TodolistDomainType) => ({
    type: ADD_TODOLIST,
    payload: {todolist}
}) as const

export const updateTodolistAC = (todoListId: string, newTitle: string) => ({
    type: UPDATE_TODOLIST,
    payload: {
        todoListId,
        newTitle
    }
}) as const

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export const deleteTodolistAC = (todoListId: string) => ({
    type: DELETE_TODOLIST,
    payload: {
        todoListId
    }
}) as const
export const setTodoEntityStatusAC = (todolistId: string, entityStatus: LoadingStatuses) => ({
    type: SET_TODO_ENTITY_STATUS,
    payload: {todolistId, entityStatus}
}) as const

export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC(LoadingStatuses.LOADING))
    todolistAPI.getTodolists().then(res => {
        if (res.data) {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC(LoadingStatuses.SUCCEEDED))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch(e => handleServerNetworkError(e, dispatch))
}

export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC(LoadingStatuses.LOADING))
    todolistAPI.createTodolist(title).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC(LoadingStatuses.SUCCEEDED))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch(e => handleServerNetworkError(e, dispatch))
}

export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setTodoEntityStatusAC(todolistId, LoadingStatuses.LOADING))
    dispatch(setAppStatusAC(LoadingStatuses.LOADING))
    todolistAPI.deleteTodolist(todolistId).then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(deleteTodolistAC(todolistId))
            dispatch(setAppStatusAC(LoadingStatuses.SUCCEEDED))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch(e => {
        handleServerNetworkError(e, dispatch)
        dispatch(setTodoEntityStatusAC(todolistId, LoadingStatuses.FAILED))
    })
}

export const updateTodoTitleTC = (todolistId: string, title: string): AppThunk => (dispatch, getState: () => AppRootStateType) => {
    const todo = getState().todolists.find(todo => todo.id === todolistId)
    if (todo) {
        dispatch(setAppStatusAC(LoadingStatuses.LOADING))
        dispatch(setTodoEntityStatusAC(todolistId, LoadingStatuses.LOADING))
        todolistAPI.updateTodolistTitle(todolistId, title).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(updateTodolistAC(todolistId, title))
                dispatch(setAppStatusAC(LoadingStatuses.SUCCEEDED))
                dispatch(setTodoEntityStatusAC(todolistId, LoadingStatuses.SUCCEEDED))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(setTodoEntityStatusAC(todolistId, LoadingStatuses.FAILED))

            }
        }).catch(e => {
            handleServerNetworkError(e, dispatch)
            dispatch(setTodoEntityStatusAC(todolistId, LoadingStatuses.FAILED))
        })
    }
}
import {todolistAPI, TodolistDomainType, TodolistsArrayDomainType} from '../../../api/todolist-api';
import {AppRootStateType, AppThunk} from '../../store';

export const ADD_TODOLIST = 'ADD_TODOLIST'
export const DELETE_TODOLIST = 'DELETE_TODOLIST'
const UPDATE_TODOLIST = 'UPDATE_TODOLIST'
const CHANGE_FILTER = 'CHANGE_FILTER'
export const SET_TODOLISTS = 'SET-TODOLISTS'
export type FilterValueType = 'All' | 'Active' | 'Completed'

export const todoListsReducer = (todoLists: TodolistsArrayDomainType = [], action: TodolistActionsType): TodolistsArrayDomainType => {
    switch (action.type) {
        case SET_TODOLISTS: {
            return action.payload.todolists.map(todoList => ({...todoList, filter: 'All'}))
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
        case CHANGE_FILTER: {
            return todoLists.map(todo => todo.id === action.payload.todoListId ? {
                ...todo,
                filter: action.payload.filter
            } : todo)
        }
        default:

            return todoLists
    }
}
export type TodolistActionsType = AddTodolistActionType
    | UpdateTodolistActionType
    | DeleteTodolistActionType
    | ChangeFilterActionType
    | SetTodolistActionType

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

type UpdateTodolistActionType = ReturnType<typeof updateTodolistAC>
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

type ChangeFilterActionType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todoListId: string, filter: FilterValueType) => ({
    type: CHANGE_FILTER,
    payload: {todoListId, filter}
}) as const

export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    todolistAPI.getTodolists().then(res => dispatch(setTodolistsAC(res.data)))
}

export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    todolistAPI.createTodolist(title).then(res => dispatch(addTodolistAC(res.data.data.item)))
}

export const removeTodolistTC = (id: string): AppThunk => (dispatch) => {
    todolistAPI.deleteTodolist(id).then(() => dispatch(deleteTodolistAC(id)))
}

export const updateTodoTitleTC = (todolistId: string, title: string): AppThunk => (dispatch, getState: () => AppRootStateType) => {
    const todo = getState().todolists.find(todo => todo.id === todolistId)
    if (todo) todolistAPI.updateTodolistTitle(todolistId, title).then(() => dispatch(updateTodolistAC(todolistId, title)))
}
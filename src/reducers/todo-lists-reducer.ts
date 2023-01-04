import {FilterValueType, TodoListsType} from '../App';
import {v1} from 'uuid';

export const ADD_TODOLIST = 'ADD_TODOLIST'
export const DELETE_TODOLIST = 'DELETE_TODOLIST'
const UPDATE_TODOLIST = 'UPDATE_TODOLIST'
const CHANGE_FILTER = 'CHANGE_FILTER'

export const todoListsReducer = (todoLists: TodoListsType, action: TodolistActionType): TodoListsType => {
    switch (action.type) {
        case ADD_TODOLIST: {
            return [
                {
                    id: action.payload.todolistId,
                    title: action.payload.todolistName,
                    filter: 'All'
                }, ...todoLists
            ]
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
type TodolistActionType = AddTodolistACType
    | UpdateTodolistACType
    | DeleteTodolistACType
    | ChangeFilterACType
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolistName: string) => ({
    type: ADD_TODOLIST,
    payload: {
        todolistId: v1(),
        todolistName
    }
}) as const
type UpdateTodolistACType = ReturnType<typeof updateTodolistAC>
export const updateTodolistAC = (todoListId: string, newTitle: string) => ({
    type: UPDATE_TODOLIST,
    payload: {
        todoListId,
        newTitle
    }
}) as const
export type DeleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export const deleteTodolistAC = (todoListId: string) => ({
    type: DELETE_TODOLIST,
    payload: {
        todoListId
    }
}) as const

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todoListId: string, filter: FilterValueType) => ({
    type: 'CHANGE_FILTER',
    payload: {todoListId, filter}
}) as const
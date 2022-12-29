import {FilterValueType, TodoListsType, TodoListType} from '../App';
import {addNewTasksToTodoListAC, deleteNewTasksFromTodoListAC, tasksActionType} from './tasks-reducer';
import {Dispatch} from 'react';

const ADD_TODOLIST = 'ADD_TODOLIST'
const UPDATE_TODOLIST = 'UPDATE_TODOLIST'
const DELETE_TODOLIST = 'DELETE_TODOLIST'
const CHANGE_FILTER = 'CHANGE_FILTER'

export const todoListsReducer = (todoLists: TodoListsType, action: todolistActionType) => {
    switch (action.type) {
        case ADD_TODOLIST: {
            action.payload.dispatchTasks(addNewTasksToTodoListAC(action.payload.newTodoListId))

            const newTodolist: TodoListType = {
                id: action.payload.newTodoListId,
                title: action.payload.todolistName,
                filter: 'All'
            }
            return [...todoLists, newTodolist]
        }
        case UPDATE_TODOLIST: {
            return todoLists.map(todoList =>
                todoList.id === action.payload.todoListId ? {
                    ...todoList,
                    title: action.payload.newTitle
                } : todoList)
        }
        case DELETE_TODOLIST: {
            action.payload.dispatchTasks(deleteNewTasksFromTodoListAC(action.payload.todoListId))
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
type todolistActionType = addTodolistACType
    | updateTodolistACType
    | deleteTodolistACType
    | changeFilterACType
type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (dispatchTasks: Dispatch<tasksActionType>, newTodoListId: string, todolistName: string) => ({
    type: ADD_TODOLIST,
    payload: {
        dispatchTasks,
        newTodoListId,
        todolistName
    }
}) as const
type updateTodolistACType = ReturnType<typeof updateTodolistAC>
export const updateTodolistAC = (todoListId: string, newTitle: string) => ({
    type: UPDATE_TODOLIST,
    payload: {
        todoListId,
        newTitle
    }
}) as const
type deleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export const deleteTodolistAC = (dispatchTasks: Dispatch<tasksActionType>, todoListId: string) => ({
    type: DELETE_TODOLIST,
    payload: {
        dispatchTasks,
        todoListId
    }
}) as const

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todoListId: string, filter: FilterValueType) => ({
    type: 'CHANGE_FILTER',
    payload: {todoListId, filter}
}) as const
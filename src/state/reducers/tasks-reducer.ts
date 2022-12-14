import {TasksType} from '../../App';
import {v1} from 'uuid';
import {ADD_TODOLIST, AddTodolistACType, DELETE_TODOLIST, DeleteTodolistACType} from './todo-lists-reducer';

const ADD_TASK = 'ADD_TASK'
const REMOVE_TASK = 'REMOVE_TASK'
const UPDATE_TASK = 'UPDATE_TASK'
const CHANGE_TASK = 'CHANGE_TASK'
const ADD_NEW_TASK = 'ADD_NEW_TASK'
const DELETE_TASK = 'DELETE_TASK'

export const tasksReducer = (tasks: TasksType = {}, action: tasksActionType): TasksType => {
    switch (action.type) {
        case ADD_TASK: {
            return {
                ...tasks, [action.payload.todoListId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...tasks[action.payload.todoListId]]
            }
        }
        case REMOVE_TASK: {
            tasks[action.payload.todoListId] = tasks[action.payload.todoListId].filter((task) => task.id !== action.payload.taskId)
            return {...tasks}
        }
        case UPDATE_TASK: {
            return ({
                ...tasks,
                [action.payload.todoListId]: tasks[action.payload.todoListId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    title: action.payload.newTitle
                } : {...task})
            })
        }
        case CHANGE_TASK: {
            return ({
                ...tasks,
                [action.payload.todoListId]: tasks[action.payload.todoListId].map((task) => task.id === action.payload.taskId ? {
                    ...task, isDone: action.payload.isDone
                } : task)
            })
        }
        case ADD_NEW_TASK: {
            return {...tasks, [action.payload.newTodoListId]: []}
        }
        case DELETE_TASK: {
            delete tasks[action.payload.todoListId]
            return {...tasks}
        }
        case ADD_TODOLIST: {
            return {...tasks, [action.payload.todolistId]: []}
        }
        case DELETE_TODOLIST: {
            const newTasks = {...tasks}
            delete newTasks[action.payload.todoListId]
            return newTasks
        }
        default:
            return tasks
    }
}
export type tasksActionType =
    AddTasksACType
    | RemoveTasksACType
    | UpdateTasksACType
    | ChangeTaskStatusACType
    | AddNewTasksToTodoListACType
    | DeleteTasksFromTodoListACType
    | AddTodolistACType
    | DeleteTodolistACType
type AddTasksACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoListId: string, title: string) => ({
    type: ADD_TASK,
    payload: {
        todoListId,
        title
    }
}) as const
type RemoveTasksACType = ReturnType<typeof removeTasksAC>
export const removeTasksAC = (todoListId: string, taskId: string) => ({
    type: REMOVE_TASK,
    payload: {
        todoListId,
        taskId
    }
}) as const
type UpdateTasksACType = ReturnType<typeof updateTasksAC>
export const updateTasksAC = (todoListId: string, taskId: string, newTitle: string) => ({
    type: UPDATE_TASK,
    payload: {
        todoListId,
        taskId,
        newTitle
    }
}) as const

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todoListId: string, taskId: string, isDone: boolean) => ({
    type: CHANGE_TASK,
    payload: {
        todoListId,
        taskId,
        isDone
    }
}) as const
type AddNewTasksToTodoListACType = ReturnType<typeof addNewTasksToTodoListAC>
export const addNewTasksToTodoListAC = (newTodoListId: string) => ({
    type: ADD_NEW_TASK,
    payload: {newTodoListId}
}) as const
type DeleteTasksFromTodoListACType = ReturnType<typeof deleteNewTasksFromTodoListAC>
export const deleteNewTasksFromTodoListAC = (todoListId: string) => ({
    type: DELETE_TASK,
    payload: {todoListId}
}) as const
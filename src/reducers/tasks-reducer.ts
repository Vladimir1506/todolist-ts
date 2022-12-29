import {TasksType} from '../App';
import {v1} from 'uuid';

const ADD_TASK = 'ADD_TASK'
const REMOVE_TASK = 'REMOVE_TASK'
const UPDATE_TASK = 'UPDATE_TASK'
const CHANGE_TASK = 'CHANGE_TASK'
const ADD_NEW_TASK = 'ADD_NEW_TASK'
const DELETE_TASK = 'DELETE_TASK'

export const tasksReducer = (tasks: TasksType, action: tasksActionType) => {
    switch (action.type) {
        case ADD_TASK: {
            const id = v1()
            tasks[action.payload.todoListId].push({
                id,
                title: action.payload.title,
                isDone: false
            })
            return {...tasks}
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
        default:
            return tasks
    }
}
export type tasksActionType =
    createAddTasksACType
    | createRemoveTasksACType
    | createUpdateTasksACType
    | changeTaskStatusACType
    | addNewTasksToTodoListACType
    | deleteTasksFromTodoListACType
type createAddTasksACType = ReturnType<typeof createAddTasksAC>
export const createAddTasksAC = (todoListId: string, title: string) => ({
    type: ADD_TASK,
    payload: {
        todoListId,
        title
    }
}) as const
type createRemoveTasksACType = ReturnType<typeof createRemoveTasksAC>
export const createRemoveTasksAC = (todoListId: string, taskId: string) => ({
    type: REMOVE_TASK,
    payload: {
        todoListId,
        taskId
    }
}) as const
type createUpdateTasksACType = ReturnType<typeof createUpdateTasksAC>
export const createUpdateTasksAC = (todoListId: string, taskId: string, newTitle: string) => ({
    type: UPDATE_TASK,
    payload: {
        todoListId,
        taskId,
        newTitle
    }
}) as const

type changeTaskStatusACType = ReturnType<typeof createChangeTaskStatusAC>
export const createChangeTaskStatusAC = (todoListId: string, taskId: string, isDone: boolean) => ({
    type: CHANGE_TASK,
    payload: {
        todoListId,
        taskId,
        isDone
    }
}) as const
type addNewTasksToTodoListACType = ReturnType<typeof addNewTasksToTodoListAC>
export const addNewTasksToTodoListAC = (newTodoListId: string) => ({
    type: ADD_NEW_TASK,
    payload: {newTodoListId}
}) as const
type deleteTasksFromTodoListACType = ReturnType<typeof deleteNewTasksFromTodoListAC>
export const deleteNewTasksFromTodoListAC = (todoListId: string) => ({
    type: DELETE_TASK,
    payload: {todoListId}
}) as const
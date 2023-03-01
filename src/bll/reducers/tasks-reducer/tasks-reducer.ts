import {
    ADD_TODOLIST,
    AddTodolistActionType,
    DELETE_TODOLIST,
    DeleteTodolistActionType,
    SET_TODOLISTS,
    setTodoEntityStatusAC,
    SetTodolistActionType
} from '../todolists-reducer/todo-lists-reducer';
import {taskAPI, TaskDomainType, TasksDomainType, TaskStatuses} from '../../../api/task-api';
import {AppRootStateType, AppThunk} from '../../store';
import {LoadingStatuses, setAppStatusAC} from '../app-reducer/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../utils/error-utils/utils';

const ADD_TASK = 'ADD_TASK'
const REMOVE_TASK = 'REMOVE_TASK'
const UPDATE_TASK = 'UPDATE_TASK'
const ADD_NEW_TASK = 'ADD_NEW_TASK'
const DELETE_TASK = 'DELETE_TASK'
const SET_TASKS = 'SET-TASKS'
const SET_TASK_ENTITY_STATUS = 'SET-TASK-ENTITY-STATUS'
export type UpdateTaskModel = {
    status?: TaskStatuses,
    title?: string
}
export const tasksReducer = (tasks: TasksDomainType = {}, action: TasksActionsType): TasksDomainType => {
    switch (action.type) {
        case SET_TASKS: {
            return {
                ...tasks,
                [action.payload.todoListId]: action.payload.tasks.map(task => ({
                    ...task,
                    entityStatus: LoadingStatuses.IDLE
                })),
            }
        }
        case SET_TODOLISTS: {
            const stateCopy = {...tasks}
            action.payload.todolists.forEach(todolist => stateCopy[todolist.id] = [])
            return stateCopy
        }
        case ADD_TASK: {
            const addedTask = action.payload.task
            return {...tasks, [addedTask.todoListId]: [addedTask, ...tasks[addedTask.todoListId]]}
        }
        case REMOVE_TASK: {
            tasks[action.payload.todoListId] = tasks[action.payload.todoListId].filter((task) => task.id !== action.payload.taskId)
            return {...tasks}
        }
        case UPDATE_TASK: {
            return ({
                ...tasks,
                [action.payload.todoListId]: tasks[action.payload.todoListId].map(task => task.id === action.payload.task.id ? {...action.payload.task} : task)
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
            return {...tasks, [action.payload.todolist.id]: []}
        }
        case DELETE_TODOLIST: {
            const newTasks = {...tasks}
            delete newTasks[action.payload.todoListId]
            return newTasks
        }
        case SET_TASK_ENTITY_STATUS:
            return {
                ...tasks,
                [action.payload.todolistId]: tasks[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    entityStatus: action.payload.entityStatus
                } : task)
            }
        default:
            return tasks
    }
}
export type TasksActionsType =
    ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTasksAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addNewTasksToTodoListAC>
    | ReturnType<typeof deleteNewTasksFromTodoListAC>
    | ReturnType<typeof setTaskEntityStatusAC>
    | AddTodolistActionType
    | DeleteTodolistActionType
    | SetTodolistActionType
    | ReturnType<typeof setTaskAC>
export const setTaskAC = (todoListId: string, tasks: Array<TaskDomainType>) => ({
    type: SET_TASKS,
    payload: {
        todoListId,
        tasks
    }
}) as const
export const addTaskAC = (task: TaskDomainType) => ({
    type: ADD_TASK,
    payload: {task}
}) as const
export const removeTasksAC = (todoListId: string, taskId: string) => ({
    type: REMOVE_TASK,
    payload: {
        todoListId,
        taskId
    }
}) as const
export const addNewTasksToTodoListAC = (newTodoListId: string) => ({
    type: ADD_NEW_TASK,
    payload: {newTodoListId}
}) as const
export const deleteNewTasksFromTodoListAC = (todoListId: string) => ({
    type: DELETE_TASK,
    payload: {todoListId}
}) as const
export const updateTaskAC = (todoListId: string, task: TaskDomainType) => ({
    type: UPDATE_TASK,
    payload: {todoListId, task}
}) as const
export const setTaskEntityStatusAC = (todolistId: string, taskId: string, entityStatus: LoadingStatuses) => ({
    type: SET_TASK_ENTITY_STATUS,
    payload: {todolistId, taskId, entityStatus}
}) as const

export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC(LoadingStatuses.LOADING))
    taskAPI.getTasks(todolistId).then(res => {
        if (res.data) {
            dispatch(setTaskAC(todolistId, res.data.items))
            dispatch(setAppStatusAC(LoadingStatuses.SUCCEEDED))
        }
    }).catch(e => handleServerNetworkError(e, dispatch))
}

export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC(LoadingStatuses.LOADING))
    dispatch(setTaskEntityStatusAC(todolistId, taskId, LoadingStatuses.LOADING))
    taskAPI.deleteTask(todolistId, taskId).then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(removeTasksAC(todolistId, taskId))
            dispatch(setAppStatusAC(LoadingStatuses.SUCCEEDED))
            dispatch(setTaskEntityStatusAC(todolistId, taskId, LoadingStatuses.SUCCEEDED))
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(setTaskEntityStatusAC(todolistId, taskId, LoadingStatuses.FAILED))
        }
    }).catch(e => {
        handleServerNetworkError(e, dispatch)
        dispatch(setTaskEntityStatusAC(todolistId, taskId, LoadingStatuses.FAILED))
    })
}

export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC(LoadingStatuses.LOADING))
    dispatch(setTodoEntityStatusAC(todolistId, LoadingStatuses.LOADING))
    taskAPI.createTask(todolistId, title).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(setAppStatusAC(LoadingStatuses.SUCCEEDED))
            dispatch(setTodoEntityStatusAC(todolistId, LoadingStatuses.SUCCEEDED))
        } else {
            handleServerAppError<{ item: TaskDomainType }>(res.data, dispatch)
            dispatch(setTodoEntityStatusAC(todolistId, LoadingStatuses.FAILED))
        }
    }).catch(e => {
        handleServerNetworkError(e, dispatch)
        dispatch(setTodoEntityStatusAC(todolistId, LoadingStatuses.FAILED))
    })
}
export const updateTaskTC = (todolistId: string, taskId: string, updateTaskModel: UpdateTaskModel): AppThunk => (dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find(task => task.id === taskId)
    if (task) {
        dispatch(setAppStatusAC(LoadingStatuses.LOADING))
        dispatch(setTaskEntityStatusAC(todolistId, taskId, LoadingStatuses.LOADING))
        taskAPI.updateTask(todolistId, taskId,
            {...task, ...updateTaskModel}).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC(todolistId, res.data.data.item))
                dispatch(setAppStatusAC(LoadingStatuses.SUCCEEDED))
                dispatch(setTaskEntityStatusAC(todolistId, taskId, LoadingStatuses.SUCCEEDED))

            } else {
                handleServerAppError<{ item: TaskDomainType }>(res.data, dispatch)
                dispatch(setTaskEntityStatusAC(todolistId, taskId, LoadingStatuses.FAILED))

            }
        }).catch(e => {
            handleServerNetworkError(e, dispatch)
            dispatch(setTaskEntityStatusAC(todolistId, taskId, LoadingStatuses.FAILED))
        })
    }
}

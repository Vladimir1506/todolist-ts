import {
    ADD_TODOLIST,
    AddTodolistActionType,
    DELETE_TODOLIST,
    DeleteTodolistActionType,
    SET_TODOLISTS,
    SetTodolistActionType
} from '../todolists-reducer/todo-lists-reducer';
import {taskAPI, TaskDomainType, TasksDomainType, TaskStatuses} from '../../../api/task-api';
import {AppRootStateType, AppThunk} from '../../store';

const ADD_TASK = 'ADD_TASK'
const REMOVE_TASK = 'REMOVE_TASK'
const UPDATE_TASK = 'UPDATE_TASK'
const CHANGE_TASK = 'CHANGE_TASK'
const ADD_NEW_TASK = 'ADD_NEW_TASK'
const DELETE_TASK = 'DELETE_TASK'
const SET_TASKS = 'SET-TASKS'

export const tasksReducer = (tasks: TasksDomainType = {}, action: TasksActionsType): TasksDomainType => {
    switch (action.type) {
        case SET_TASKS: {
            return {
                ...tasks, [action.payload.todoListId]: action.payload.tasks
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
                [action.payload.todoListId]: tasks[action.payload.todoListId].map(task => task.id === action.payload.task.id ? action.payload.task : {...task})
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
            return {...tasks, [action.payload.todolist.id]: []}
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
export type TasksActionsType =
    AddTasksACType
    | RemoveTasksActionType
    | UpdateTasksActionType
    | ChangeTaskStatusActionType
    | AddNewTasksToTodoListActionType
    | DeleteTasksFromTodoListActionType
    | AddTodolistActionType
    | DeleteTodolistActionType
    | SetTodolistActionType
    | SetTasksActionType
type SetTasksActionType = ReturnType<typeof setTaskAC>
export const setTaskAC = (todoListId: string, tasks: Array<TaskDomainType>) => ({
    type: SET_TASKS,
    payload: {
        todoListId,
        tasks
    }
}) as const
type AddTasksACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskDomainType) => ({
    type: ADD_TASK,
    payload: {task}
}) as const
type RemoveTasksActionType = ReturnType<typeof removeTasksAC>
export const removeTasksAC = (todoListId: string, taskId: string) => ({
    type: REMOVE_TASK,
    payload: {
        todoListId,
        taskId
    }
}) as const
type UpdateTasksActionType = ReturnType<typeof updateTasksAC>
export const updateTasksAC = (todoListId: string, task: TaskDomainType) => ({
    type: UPDATE_TASK,
    payload: {
        todoListId,
        task
    }
}) as const

type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todoListId: string, taskId: string, isDone: boolean) => ({
    type: CHANGE_TASK,
    payload: {
        todoListId,
        taskId,
        isDone
    }
}) as const
type AddNewTasksToTodoListActionType = ReturnType<typeof addNewTasksToTodoListAC>
export const addNewTasksToTodoListAC = (newTodoListId: string) => ({
    type: ADD_NEW_TASK,
    payload: {newTodoListId}
}) as const
type DeleteTasksFromTodoListActionType = ReturnType<typeof deleteNewTasksFromTodoListAC>
export const deleteNewTasksFromTodoListAC = (todoListId: string) => ({
    type: DELETE_TASK,
    payload: {todoListId}
}) as const

export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    taskAPI.getTasks(todolistId).then(res => dispatch(setTaskAC(todolistId, res.data.items)))
}

export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    taskAPI.deleteTask(todolistId, taskId).then(() => dispatch(removeTasksAC(todolistId, taskId)))
}

export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    taskAPI.createTask(todolistId, title).then(res => dispatch(addTaskAC(res.data.data.item)))
}

export const updateTaskStatusTC = (todolistId: string, taskId: string, isDone: boolean): AppThunk => (dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find(task => task.id === taskId)
    if (task) taskAPI.updateTask(todolistId, taskId,
        {
            ...task,
            status: isDone ? TaskStatuses.Completed : TaskStatuses.New,
        }).then((res) => dispatch(updateTasksAC(todolistId, res.data.data.item)))
}

export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string): AppThunk => (dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find(task => task.id === taskId)
    if (task) taskAPI.updateTask(todolistId, taskId,
        {...task, title}).then((res) => dispatch(updateTasksAC(todolistId, res.data.data.item)))
}
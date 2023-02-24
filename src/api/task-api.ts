import {instance, ResponseType} from './api-utils';

export type TaskDomainType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type TasksDomainArrayType = Array<TaskDomainType>
export type TasksDomainType = { [taskId: string]: TasksDomainArrayType }

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

type getTasksAPIResponseType = {
    error: string
    items: Array<TaskDomainType>
    totalCount: number
}

export const taskAPI = {
    getTasks(todolistId: string, count: number = 100, page: number = 1) {
        return instance.get<getTasksAPIResponseType>(todolistId + '/tasks?count=' + count + '&page' + page)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskDomainType }>>(todolistId + '/tasks', {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(todolistId + '/tasks/' + taskId)
    },
    updateTask(todolistId: string, taskId: string, task: TaskDomainType) {
        return instance.put<ResponseType<{ item: TaskDomainType }>>(todolistId + '/tasks/' + taskId, {...task})
    },
}
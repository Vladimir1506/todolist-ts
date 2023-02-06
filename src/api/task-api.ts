import {instance, ResponseType} from './api-utils';

export type TaskAPIType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

type getTasksAPIResponseType = {
    error: string
    items: Array<TaskAPIType>
    totalCount: number
}

export const taskAPI = {
    getTasks(id: string, count: number = 100, page: number = 1) {
        return instance.get<getTasksAPIResponseType>(id + '/tasks?count=' + count + '&page' + page)
    },
    createTask(id: string, title: string) {
        return instance.post<ResponseType<{ item: TaskAPIType }>>(id + '/tasks', {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(todolistId + '/tasks/' + taskId)
    },
    updateTask(todolistId: string, taskId: string, task: TaskAPIType) {
        return instance.put<ResponseType>(todolistId + '/tasks/' + taskId, {...task})
    },
}
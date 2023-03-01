import {instance, ResponseType} from './api-utils';
import {LoadingStatuses} from '../bll/reducers/app-reducer/app-reducer';

export type TodolistDomainType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
    entityStatus: LoadingStatuses
}
export type TodolistsArrayDomainType = Array<TodolistDomainType>

export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistDomainType>>('')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistDomainType }>>('', {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(id)
    },
    updateTodolistTitle(id: string, title: string) {
        return instance.put<ResponseType>(id, {title})
    },
}
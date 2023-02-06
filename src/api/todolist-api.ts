import {instance, ResponseType} from './api-utils';

export type TodolistAPIType = {
    'id': string,
    'title': string,
    'addedDate': string,
    'order': number
}


export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistAPIType>>('')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistAPIType }>>('', {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(id)
    },
    updateTodolistTitle(id: string) {
        return instance.put<ResponseType>(id, {title: 'NewTitle' + new Date().getSeconds()})

    },
}
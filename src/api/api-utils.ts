import axios from 'axios';

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>,
    data: D
}
export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true
})
import axios from 'axios';
import {ResponseType} from './api-utils';

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/auth/',
    withCredentials: true
})

export type MeResponseType = {
    id: number, email: string, login: string
}
export const authApi = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId: number }>>('login', data)
    },
    me() {
        return instance.get<ResponseType<MeResponseType>>('me')
    },
    logout() {
        return instance.delete<ResponseType>('login')
    }
}
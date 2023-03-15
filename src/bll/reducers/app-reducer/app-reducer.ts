import {AppThunk} from '../../store';
import {authApi, MeResponseType} from '../../../api/auth-api';
import {handleServerAppError, handleServerNetworkError} from '../../../utils/error-utils/utils';
import {loginAC} from '../auth-reducer/auth-reducer';

export enum LoadingStatuses {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCEEDED = 'succeeded',
    FAILED = 'failed',
}

export type AppErrorType = null | string

export type AppStateType = typeof InitialState
const InitialState = {
    loadingStatus: LoadingStatuses.IDLE as LoadingStatuses,
    error: null as AppErrorType,
    initialized: false
}

export const appReducer = (state: AppStateType = InitialState, action: AppActions): AppStateType => {
    switch (action.type) {
        case 'SET-LOADING-STATUS':
            return {...state, loadingStatus: action.payload.status}
        case 'SET-ERROR':
            return {...state, error: action.payload.error}
        case 'SET-INIT':
            return {...state, initialized: true}
        default:
            return state
    }
}

export type AppActions =
    ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setInit>

export const setAppStatusAC = (status: LoadingStatuses) => ({
    type: 'SET-LOADING-STATUS',
    payload: {status}
}) as const

export const setAppErrorAC = (error: AppErrorType) => ({
    type: 'SET-ERROR',
    payload: {error}
}) as const

export const setInit = () => ({
    type: 'SET-INIT'
}) as const

export const initAppTC = (): AppThunk => dispatch => {
    authApi.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(loginAC(true))
        } else {
            handleServerAppError<MeResponseType>(res.data, dispatch)
        }
    }).catch(e => {
        handleServerNetworkError(e, dispatch)
    }).finally(() => dispatch(setInit())
    )
}
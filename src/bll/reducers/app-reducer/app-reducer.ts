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
    error: null as AppErrorType
}

export const appReducer = (state: AppStateType = InitialState, action: AppActions): AppStateType => {
    switch (action.type) {
        case 'SET-LOADING-STATUS':
            return {...state, loadingStatus: action.payload.status}
        case 'SET-ERROR':
            return {...state, error: action.payload.error}
        default:
            return state
    }
}

export type AppActions =
    ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>

export const setAppStatusAC = (status: LoadingStatuses) => ({
    type: 'SET-LOADING-STATUS',
    payload: {status}
}) as const

export const setAppErrorAC = (error: AppErrorType) => ({
    type: 'SET-ERROR',
    payload: {error}
}) as const
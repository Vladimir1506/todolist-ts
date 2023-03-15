import {AppThunk} from '../../store';
import {authApi, LoginParamsType} from '../../../api/auth-api';
import {handleServerAppError, handleServerNetworkError} from '../../../utils/error-utils/utils';
import {LoadingStatuses, setAppStatusAC} from '../app-reducer/app-reducer';

type AuthStateType = {
    isLoggedIn: boolean
}
const initialState: AuthStateType = {
    isLoggedIn: false
}
export const authReducer = (state: AuthStateType = initialState, action: AuthActionType) => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.payload.value}
        default:
            return state
    }
}
export type AuthActionType = ReturnType<typeof loginAC>
export const loginAC = (value: boolean) => ({
    type: 'SET-IS-LOGGED-IN', payload: {value}
})

export const loginTC = (loginData: LoginParamsType): AppThunk => dispatch => {
    dispatch(setAppStatusAC(LoadingStatuses.LOADING))
    authApi.login(loginData).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(loginAC(true))
            dispatch(setAppStatusAC(LoadingStatuses.SUCCEEDED))
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(setAppStatusAC(LoadingStatuses.FAILED))
        }
    }).catch(e => {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC(LoadingStatuses.FAILED))
    })
}

export const logoutTC = (): AppThunk => dispatch => {
    dispatch(setAppStatusAC(LoadingStatuses.LOADING))
    authApi.logout().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(loginAC(false))
            dispatch(setAppStatusAC(LoadingStatuses.SUCCEEDED))
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(setAppStatusAC(LoadingStatuses.FAILED))
        }
    }).catch(e => {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC(LoadingStatuses.FAILED))
    })
}
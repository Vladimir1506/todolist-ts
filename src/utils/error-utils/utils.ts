import {AppActions, LoadingStatuses, setAppErrorAC, setAppStatusAC} from '../../bll/reducers/app-reducer/app-reducer';
import {ResponseType} from '../../api/api-utils';
import {Dispatch} from 'redux';

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC(LoadingStatuses.FAILED))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC(LoadingStatuses.FAILED))
}

type ErrorUtilsDispatchType = Dispatch<AppActions>
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {TasksActionsType, tasksReducer} from './reducers/tasks-reducer/tasks-reducer';
import {TodolistActionsType, todoListsReducer} from './reducers/todolists-reducer/todo-lists-reducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppActions, appReducer} from './reducers/app-reducer/app-reducer';
import {AuthActionType, authReducer} from './reducers/auth-reducer/auth-reducer';

export type AppRootStateType = ReturnType<typeof rootReducer>
type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppActionsType = TasksActionsType | TodolistActionsType | AppActions | AuthActionType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer,
    app: appReducer,
    auth: authReducer
})
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store


import {combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from './reducers/tasks-reducer';
import {todoListsReducer} from './reducers/todo-lists-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})

export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store


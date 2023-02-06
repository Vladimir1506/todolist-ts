import {Provider} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../../state/reducers/tasks-reducer';
import {todoListsReducer} from '../../state/reducers/todo-lists-reducer';
import {v1} from 'uuid';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        'todolistId1': [
            {taskId: v1(), title: 'HTML&CSS', isDone: true},
            {taskId: v1(), title: 'JS', isDone: true}
        ],
        'todolistId2': [
            {taskId: v1(), title: 'Milk', isDone: true},
            {taskId: v1(), title: 'React Book', isDone: true}
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)
export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
import {Provider} from 'react-redux';
import {AppRootStateType} from '../../bll/store';
import {combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from '../../bll/reducers/tasks-reducer/tasks-reducer';
import {todoListsReducer} from '../../bll/reducers/todolists-reducer/todo-lists-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})

const initialGlobalState = {
    todolists: [
        {
            'id': 'todolistId1',
            'title': 'newTodolist11',
            'addedDate': '2023-02-06T09:48:11.95',
            'order': -20
        },
        {
            'id': 'todolistId2',
            'title': 'newTodolist12',
            'addedDate': '2023-02-06T09:48:11.95',
            'order': -20
        },
        // {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        // {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        'todolistId1': [
            {
                'id': 'b94a1864-6e9c-4aad-b2c4-544911dcab41',
                'title': 'HTML&CSS',
                'description': '',
                'todoListId': 'todolistId1',
                'order': -8,
                'status': 1,
                'priority': 0,
                'startDate': '2023-02-15T21:15:33.687',
                'deadline': '2023-02-15T21:15:33.687',
                'addedDate': '2023-02-15T20:08:10.703'
            },
            {
                'id': 'b94a1864-6e9c-4aad-b2c4-544911dcab41',
                'title': 'JS',
                'description': '',
                'todoListId': 'todolistId1',
                'order': -8,
                'status': 1,
                'priority': 0,
                'startDate': '2023-02-15T21:15:33.687',
                'deadline': '2023-02-15T21:15:33.687',
                'addedDate': '2023-02-15T20:08:10.703'
            }
            // {taskId: v1(), title: 'HTML&CSS', isDone: true},
            // {taskId: v1(), title: 'JS', isDone: true}
        ],
        'todolistId2': [
            {
                'id': 'b94a1864-6e9c-4aad-b2c4-544911dcab41',
                'title': 'Milk',
                'description': '',
                'todoListId': 'todolistId2',
                'order': -8,
                'status': 1,
                'priority': 0,
                'startDate': '2023-02-15T21:15:33.687',
                'deadline': '2023-02-15T21:15:33.687',
                'addedDate': '2023-02-15T20:08:10.703'
            },
            {
                'id': 'b94a1864-6e9c-4aad-b2c4-544911dcab41',
                'title': 'React Book',
                'description': '',
                'todoListId': 'todolistId2',
                'order': -8,
                'status': 1,
                'priority': 0,
                'startDate': '2023-02-15T21:15:33.687',
                'deadline': '2023-02-15T21:15:33.687',
                'addedDate': '2023-02-15T20:08:10.703'
            }
            // {taskId: v1(), title: 'Milk', isDone: true},
            // {taskId: v1(), title: 'React Book', isDone: true}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)
export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
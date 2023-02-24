import {addTodolistAC, deleteTodolistAC, todoListsReducer} from './todolists-reducer/todo-lists-reducer';
import {tasksReducer} from './tasks-reducer/tasks-reducer';
import {TasksDomainType, TaskStatuses} from '../../api/task-api';
import {TodolistDomainType, TodolistsArrayDomainType} from '../../api/todolist-api';

let startState: TasksDomainType

beforeEach(() => {
    startState = {
        'todolistId1': [{
            id: '1', title: 'HTML', status: TaskStatuses.New, description: '', todoListId: 'todolistId1',
            order: -8, priority: 0, startDate: '2023-02-15T21:15:33.687', deadline: '2023-02-15T21:15:33.687',
            addedDate: '2023-02-15T20:08:10.703'
        }, {
            id: '2', title: 'JS', status: TaskStatuses.Completed, description: '', todoListId: 'todolistId1',
            order: -8, priority: 0, startDate: '2023-02-15T21:15:33.687', deadline: '2023-02-15T21:15:33.687',
            addedDate: '2023-02-15T20:08:10.703'
        }],
        'todolistId2': [
            {
                id: '1', title: 'HTML', status: TaskStatuses.New, description: '', todoListId: 'todolistId2',
                order: -8, priority: 0, startDate: '2023-02-15T21:15:33.687', deadline: '2023-02-15T21:15:33.687',
                addedDate: '2023-02-15T20:08:10.703'
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, description: '', todoListId: 'todolistId2',
                order: -8, priority: 0, startDate: '2023-02-15T21:15:33.687', deadline: '2023-02-15T21:15:33.687',
                addedDate: '2023-02-15T20:08:10.703'
            }
        ]
    }
})

test('new array should be added when new todolist is added', () => {

    const newTodo: TodolistDomainType = {'id': 'todolistId3', 'title': 'new todolist', 'addedDate': '', 'order': 0}
    const action = addTodolistAC(newTodo)

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('ids should be equals', () => {
    const startTasksState: TasksDomainType = {}
    const startTodolistsState: TodolistsArrayDomainType = []
    const newTodo: TodolistDomainType = {'id': 'todolistId3', 'title': 'new todolist', 'addedDate': '', 'order': 0}

    const action = addTodolistAC(newTodo)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})
test('property with todolistId should be deleted', () => {

    const action = deleteTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

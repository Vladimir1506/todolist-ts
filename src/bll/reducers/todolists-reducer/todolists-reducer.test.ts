import {addTodolistAC, deleteTodolistAC, todoListsReducer, updateTodolistAC} from './todo-lists-reducer';
import {TodolistDomainType, TodolistsArrayDomainType} from '../../../api/todolist-api';
import {LoadingStatuses} from '../app-reducer/app-reducer';

let todolist1: string
let todolist2: string
let startState: TodolistsArrayDomainType

beforeEach(() => {
    todolist1 = 'todolist1'
    todolist2 = 'todolist2'

    startState = [
        {
            id: todolist1, title: 'What to learn', order: 0, addedDate: '', entityStatus: LoadingStatuses.IDLE
        },
        {
            id: todolist2, title: 'What to buy', order: 0, addedDate: '', entityStatus: LoadingStatuses.IDLE
        },
    ]
})


test('correct todolist should be added', () => {
    const newTodo: TodolistDomainType = {
        'id': 'todolistId3', 'title': 'new todolist', 'addedDate': '', 'order': 0, entityStatus: LoadingStatuses.IDLE
    }
    const endState = todoListsReducer(startState, addTodolistAC(newTodo))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodo.title)
})
test('correct todolist should be removed', () => {
    const endState = todoListsReducer(startState, deleteTodolistAC(todolist1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolist2)
})
test('correct todolist title should be changed', () => {
    const endState = todoListsReducer(startState, updateTodolistAC(todolist1, 'NewTitle'))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('NewTitle')
})
import {v1} from 'uuid';
import {
    addTodolistAC,
    changeFilterAC,
    deleteTodolistAC,
    todoListsReducer,
    updateTodolistAC
} from './todo-lists-reducer';
import {TodoListsType} from '../App';

test('correct todolist filter should be changed', () => {
    let todolist1 = v1()
    let todolist2 = v1()

    const startState: TodoListsType = [
        {id: todolist1, title: 'What to learn', filter: 'All'},
        {id: todolist2, title: 'What to buy', filter: 'All'},
    ]

    const endState = todoListsReducer(startState, changeFilterAC(todolist1, 'Completed'))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('Completed')
})
test('correct todolist should be added', () => {
    let todolist1 = v1()
    let todolist2 = v1()

    const startState: TodoListsType = [
        {id: todolist1, title: 'What to learn', filter: 'All'},
        {id: todolist2, title: 'What to buy', filter: 'All'},
    ]

    const endState = todoListsReducer(startState, addTodolistAC('NewTodoList'))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('NewTodoList')
})
test('correct todolist should be removed', () => {
    let todolist1 = v1()
    let todolist2 = v1()

    const startState: TodoListsType = [
        {id: todolist1, title: 'What to learn', filter: 'All'},
        {id: todolist2, title: 'What to buy', filter: 'All'},
    ]

    const endState = todoListsReducer(startState, deleteTodolistAC(todolist1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolist2)
})
test('correct todolist title should be changed', () => {
    let todolist1 = v1()
    let todolist2 = v1()

    const startState: TodoListsType = [
        {id: todolist1, title: 'What to learn', filter: 'All'},
        {id: todolist2, title: 'What to buy', filter: 'All'},
    ]

    const endState = todoListsReducer(startState, updateTodolistAC(todolist1, 'NewTitle'))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('NewTitle')
})
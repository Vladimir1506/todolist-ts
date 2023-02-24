import {v1} from 'uuid';
import {
    addTodolistAC,
    changeFilterAC,
    deleteTodolistAC,
    todoListsReducer,
    updateTodolistAC
} from './todo-lists-reducer';
// import {TodoListsType} from '../../../AppWithRedux';
test('1', () => {
})
let todolist1: string
let todolist2: string
// let startState: TodoListsType

beforeEach(() => {
    todolist1 = v1()
    todolist2 = v1()

    // startState = [
    //     {id: todolist1, title: 'What to learn', filter: 'All'},
    //     {id: todolist2, title: 'What to buy', filter: 'All'},
    // ]
})

// test('correct todolist filter should be changed', () => {
//     const endState = todoListsReducer(startState, changeFilterAC(todolist1, 'Completed'))
//
//     expect(endState.length).toBe(2)
//     expect(endState[0].filter).toBe('Completed')
// })
// test('correct todolist should be added', () => {
//     const endState = todoListsReducer(startState, addTodolistAC('NewTodoList'))
//
//     expect(endState.length).toBe(3)
//     expect(endState[0].title).toBe('NewTodoList')
// })
// test('correct todolist should be removed', () => {
//     const endState = todoListsReducer(startState, deleteTodolistAC(todolist1))
//
//     expect(endState.length).toBe(1)
//     expect(endState[0].id).toBe(todolist2)
// })
// test('correct todolist title should be changed', () => {
//     const endState = todoListsReducer(startState, updateTodolistAC(todolist1, 'NewTitle'))
//
//     expect(endState.length).toBe(2)
//     expect(endState[0].title).toBe('NewTitle')
// })
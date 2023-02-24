import {addTaskAC, changeTaskStatusAC, tasksReducer, updateTasksAC} from './tasks-reducer';
import {TaskDomainType, TasksDomainArrayType} from '../../../api/task-api';

// let startState: TasksDomainArrayType

// beforeEach(() => {
//     startState = {
//         'todolistId1': [
//             {taskId: '1', title: 'CSS', isDone: false},
//             {taskId: '2', title: 'JS', isDone: true},
//             {taskId: '3', title: 'React', isDone: false}
//         ],
//         'todolistId2': [
//             {taskId: '1', title: 'bread', isDone: false},
//             {taskId: '2', title: 'milk', isDone: true},
//             {taskId: '3', title: 'tea', isDone: false}
//         ]
//     }
// })
test('', () => {
})

// test('correct task should be added to correct array', () => {
//     const newTask: TaskDomainType = {
//         'id': 'todolistId1',
//         'title': '17',
//         'description': '',
//         'todoListId': 'fd49704d-21e1-49b0-bdd0-31f9752127d2',
//         'order': -6,
//         'status': 0,
//         'priority': 1,
//         'startDate': new Date(),
//         'deadline': new Date(),
//         'addedDate': new Date()
//     }
//     const action = addTaskAC(newTask)
//     const endState = tasksReducer(startState, action)
//
//     expect(endState['todolistId1'].length).toBe(3)
//     expect(endState['todolistId2'].length).toBe(4)
//     expect(endState['todolistId2'][0].taskId).toBeDefined()
//     expect(endState['todolistId2'][0].title).toBe('juce')
//     expect(endState['todolistId2'][0].isDone).toBe(false)
// })
// test('status of specified task should be changed', () => {
//     const action = changeTaskStatusAC('todolistId2', '2', false)
//     const endState = tasksReducer(startState, action)
//
//     expect(endState['todolistId2'][1].isDone).toBeFalsy()
//     expect(endState['todolistId2'].length).toBe(3)
//
// })
// test('title of specified task should be changed', () => {
//     const action = updateTasksAC('todolistId1', '1', 'NewTitle')
//     const endState = tasksReducer(startState, action)
//
//     expect(endState['todolistId1'][0].title).toBe('NewTitle')
//     expect(endState['todolistId1'].length).toBe(3)
//
// })

import {addTaskAC, tasksReducer, updateTaskAC} from './tasks-reducer';
import {TaskDomainType, TasksDomainType, TaskStatuses} from '../../../api/task-api';

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

test('correct task should be added to correct array', () => {
    const newTask: TaskDomainType = {
        'id': 'taskId',
        'title': 'newTaskTitle',
        'description': '',
        'todoListId': 'todolistId2',
        'order': -6,
        'status': 0,
        'priority': 1,
        'startDate': '',
        'deadline': '',
        'addedDate': ''
    }
    const action = addTaskAC(newTask)
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(2)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('newTaskTitle')
    expect(endState['todolistId2'][0].status).toBe(0)
})
test('status of specified task should be changed', () => {
    const updatedTask = {
        id: '2', title: 'NewTitle', status: TaskStatuses.New, description: '', todoListId: 'todolistId2',
        order: -8, priority: 0, startDate: '2023-02-15T21:15:33.687', deadline: '2023-02-15T21:15:33.687',
        addedDate: '2023-02-15T20:08:10.703'
    }
    const action = updateTaskAC('todolistId2', updatedTask)
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(0)
    expect(endState['todolistId2'].length).toBe(2)

})
test('title of specified task should be changed', () => {
    const updatedTask = {
        id: '1', title: 'NewTitle', status: TaskStatuses.New, description: '', todoListId: 'todolistId2',
        order: -8, priority: 0, startDate: '2023-02-15T21:15:33.687', deadline: '2023-02-15T21:15:33.687',
        addedDate: '2023-02-15T20:08:10.703'
    }
    const action = updateTaskAC('todolistId1', updatedTask)
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][0].title).toBe('NewTitle')
    expect(endState['todolistId1'].length).toBe(2)

})

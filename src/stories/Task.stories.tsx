import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import Task from '../components/Task';
import {TaskStatuses} from '../api/task-api';

export default {
    title: 'TODOLIST/Task',
    component: Task,
    args: {
        // task: {taskId: 'task1', title: 'Task 1', isDone: true},
        task: {
            id: 'task1',
            title: 'Task 1',
            status: TaskStatuses.Completed,
            description: '',
            todoListId: 'todolistId1',
            order: -8,
            priority: 0,
            startDate: '2023-02-15T21:15:33.687',
            deadline: '2023-02-15T21:15:33.687',
            addedDate: '2023-02-15T20:08:10.703'
        },
        todolistId: 'todolistId1',
        changeTaskStatus: action('changeTaskStatus'),
        updateTaskTitle: action('updateTaskTitle'),
        removeTask: action('removeTask'),
    }
} as ComponentMeta<typeof Task>

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

export const TaskIsDoneStory = Template.bind({})

export const TaskIsNotDoneStory = Template.bind({})

TaskIsNotDoneStory.args = {
    task: {
        id: 'task1',
        title: 'Task 1',
        status: TaskStatuses.New,
        description: '',
        todoListId: 'todolistId1',
        order: -8,
        priority: 0,
        startDate: '2023-02-15T21:15:33.687',
        deadline: '2023-02-15T21:15:33.687',
        addedDate: '2023-02-15T20:08:10.703'
    },
}
import Task from '../components/Task';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';

export default {
    title: 'TODOLIST/Task',
    component: Task,
    args:{
        task: {taskId: 'task1', title: 'Task 1', isDone: true},
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
    task: {taskId: 'task1', title: 'Task 1', isDone: false},
}
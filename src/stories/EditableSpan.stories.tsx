import EditableSpan from '../components/EditableSpan';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';

export default {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan
} as ComponentMeta<typeof EditableSpan>

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />

export const EditableSpanStory = Template.bind({})

EditableSpanStory.args = {
    title: 'EditableSpan',
    spanCallback: action('Edited'),
}
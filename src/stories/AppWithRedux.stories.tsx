import AppWithRedux from '../AppWithRedux';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator';

export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>

const Template: ComponentStory<typeof AppWithRedux> = () => <AppWithRedux/>

export const AppWithReduxStory = Template.bind({})
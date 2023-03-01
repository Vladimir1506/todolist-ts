import App from '../App';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator';

export default {
    title: 'TODOLIST/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = () => <App/>

export const AppWithReduxStory = Template.bind({})
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import AddItemForm from '../components/AddItemForm';
import {action} from '@storybook/addon-actions';
import {Button, TextField} from '@mui/material';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        addItem: {
            description: 'Button clicked inside form'
        }
    },
} as ComponentMeta<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormStory.args = {
    addItem: action('Button clicked inside form')
};
const Template2: ComponentStory<typeof AddItemForm> = (args) =>{
    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<boolean>(true)
    const addButtonHandler = () => {
        (inputValue.trim() !== '') ? args.addItem(inputValue) : setError(true)
        setInputValue('')
    }

    const errorMessage = error &&
        <div style={{fontWeight: 'bold', color: 'red'}}>Please, enter non-empty title</div>
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && addButtonHandler()
    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const currentInputValue = event.currentTarget.value
        error && currentInputValue.trim().length && setError(false)
        setInputValue(currentInputValue)
    }
    const onBlurTextFieldHandler = () => setError(false)
    return (
        <div>
            <TextField
                variant="outlined"
                size="small"
                // className={error ? 'input-error' : ''}
                error={error}
                label={'Title'}
                helperText={errorMessage}
                value={inputValue}
                onChange={onChangeInputValueHandler}
                onKeyDown={onKeyPressHandler}
                onBlur={onBlurTextFieldHandler}
            />
            <Button onClick={addButtonHandler} variant="contained" size="large"
                    style={{
                        fontWeight: 'bold',
                        marginLeft: '5px',
                        maxWidth: '40px',
                        maxHeight: '40px',
                        minWidth: '40px',
                        minHeight: '40px'
                    }}>+</Button>
        </div>
    );
};

export const AddItemFormErrorStory = Template2.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormErrorStory.args = {
    addItem: action('Button clicked inside form')
};
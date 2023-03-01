import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {Button, TextField} from '@mui/material';

type InputPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}
const AddItemForm = memo(({addItem, disabled}: InputPropsType) => {
    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const addButtonHandler = () => {
        (inputValue.trim() !== '') ? addItem(inputValue) : setError(true)
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
                disabled={disabled}
                variant="outlined"
                size="small"
                error={error}
                label={'Title'}
                helperText={errorMessage}
                value={inputValue}
                onChange={onChangeInputValueHandler}
                onKeyDown={onKeyPressHandler}
                onBlur={onBlurTextFieldHandler}
            />
            <Button onClick={addButtonHandler} variant="contained" size="large"
                    disabled={disabled}
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
});

export default AddItemForm;
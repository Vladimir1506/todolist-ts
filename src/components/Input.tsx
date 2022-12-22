import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@mui/material';

type InputPropsType = {
    addCallback: (title: string) => void
}
const Input = ({addCallback}: InputPropsType) => {
    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const addButtonHandler = () => {
        (inputValue.trim() !== '') ? addCallback(inputValue) : setError(true)
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

export default Input;
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from '@mui/material';
import styled from 'styled-components';

type EditableTitlePropsType = {
    title: string
    spanCallback: (title: string) => void
    disabled?: boolean
}
const EditableSpan = ({title, spanCallback, disabled}: EditableTitlePropsType) => {
    const [edit, setEdit] = useState(false)
    const [value, setValue] = useState<string>(title)

    const changeEditHandler = () => {
        if (disabled) return
        spanCallback(value)
        setEdit(!edit)
    }
    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const currentInputValue = event.currentTarget.value
        setValue(currentInputValue)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && changeEditHandler()
    const Span = styled.span<{ disabled: boolean }>`
      cursor: ${props => props.disabled ? 'default' : 'auto'};
    `

    return (
        edit ? <span>
                <TextField variant="outlined"
                           value={value}
                           onBlur={changeEditHandler} autoFocus
                           onChange={onChangeInputValueHandler}
                           onKeyDown={onKeyPressHandler}
                           size={'small'}
                />
        </span>
            :
            <Span disabled={!!disabled} onDoubleClick={changeEditHandler}> {value} </Span>
    );
};

export default EditableSpan;
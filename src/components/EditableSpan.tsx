import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {TextField} from '@mui/material';
import styled from 'styled-components';

type EditableTitlePropsType = {
    title: string
    spanCallback: (title: string) => void
    disabled?: boolean
}
const Span = styled.span<{ disabled: boolean }>`
  cursor: ${props => props.disabled ? 'default' : 'auto'};
`

const EditableSpan = memo(({title, spanCallback, disabled}: EditableTitlePropsType) => {
    const [edit, setEdit] = useState(false)
    const [value, setValue] = useState<string>(title)

    const changeEditHandler = () => {
        if (disabled) return
        if (edit) spanCallback(value)
        setEdit(!edit)
    }
    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value)

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && changeEditHandler()

    return (edit ? <span>
                <TextField variant="outlined"
                           value={value}
                           onBlur={changeEditHandler} autoFocus
                           onChange={onChangeInputValueHandler}
                           onKeyDown={onKeyPressHandler}
                           size={'small'}
                />
        </span> :
            <Span disabled={!!disabled} onDoubleClick={changeEditHandler}> {value} </Span>
    );
});

export default EditableSpan;
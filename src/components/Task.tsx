import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import EditableSpan from './EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType} from '../AppWithRedux';

export type TaskPropsType = {
    task: TaskType
    changeTaskStatus: (e: ChangeEvent<HTMLInputElement>) => void
    updateTaskTitle: (title: string) => void
    removeTask: () => void
}
const Task = memo(({task, changeTaskStatus, updateTaskTitle, removeTask}: TaskPropsType) => {
    const {title, isDone} = task

    console.log('Task ' + title)

    return (<div>
            <Checkbox
                onChange={changeTaskStatus}
                checked={isDone}/>
            <span className={isDone ? 'task-done' : ''}>
                        <EditableSpan title={title} spanCallback={updateTaskTitle}/>
                    </span>
            <IconButton onClick={removeTask} aria-label="delete" size="small">
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </div>
    )
});

export default Task;
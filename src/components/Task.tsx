import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import EditableSpan from './EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType} from '../AppWithRedux';
import {changeTaskStatusAC, removeTasksAC, updateTasksAC} from '../state/reducers/tasks-reducer';
import {useDispatch} from 'react-redux';

export type TaskPropsType = {
    todolistId: string
    task: TaskType
}
const Task = memo(({task, todolistId}: TaskPropsType) => {
    const {taskId, title, isDone} = task

    console.log('Task ' + title)
    const dispatch = useDispatch()
    const updateTaskTitle = useCallback((title: string) => dispatch(updateTasksAC(todolistId, taskId, title)), [dispatch, todolistId, taskId])
    const removeTask = useCallback(() => dispatch(removeTasksAC(todolistId, taskId)), [dispatch, todolistId, taskId])
    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(todolistId, taskId, e.currentTarget.checked)), [dispatch, todolistId, taskId])
    return (<div>
            <Checkbox
                onChange={changeTaskStatus}
                checked={isDone}/>
            <span className={isDone ? 'task-done' : ''}>
                        <EditableSpan title={title} spanCallback={updateTaskTitle} disabled={isDone}/>
                    </span>
            <IconButton onClick={removeTask} aria-label="delete" size="small" disabled={isDone}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </div>
    )
});

export default Task;
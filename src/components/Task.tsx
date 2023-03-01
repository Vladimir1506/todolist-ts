import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import EditableSpan from './EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {removeTaskTC, updateTaskTC} from '../bll/reducers/tasks-reducer/tasks-reducer';
import {useAppDispatch} from '../bll/store';
import {TaskDomainType, TaskStatuses} from '../api/task-api';

export type TaskPropsType = {
    todolistId: string
    task: TaskDomainType,
    disabled: boolean
}
const Task = memo(({task, todolistId, disabled}: TaskPropsType) => {
        const {id, title, status} = task
        const dispatch = useAppDispatch()
        const updateTaskTitle = useCallback((title: string) => dispatch(updateTaskTC(todolistId, id, {title})), [dispatch, todolistId, id])
        const removeTask = useCallback(() => dispatch(removeTaskTC(todolistId, id)), [dispatch, todolistId, id])
        const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => dispatch(updateTaskTC(todolistId, id, {
            status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        })), [dispatch, todolistId, id])
        return (<div>
                <Checkbox
                    disabled={disabled}
                    onChange={changeTaskStatus}
                    checked={status === TaskStatuses.Completed}/>
                <span className={status ? 'task-done' : ''}>
                        <EditableSpan title={title} spanCallback={updateTaskTitle}
                                      disabled={disabled}/>
                    </span>
                <IconButton onClick={removeTask} aria-label="delete" size="small"
                            disabled={disabled}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </div>
        )
    })
;

export default Task;
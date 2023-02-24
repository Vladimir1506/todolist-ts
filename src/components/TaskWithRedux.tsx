import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import EditableSpan from './EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {removeTaskTC, updateTaskStatusTC, updateTaskTitleTC} from '../bll/reducers/tasks-reducer/tasks-reducer';
import {useAppDispatch} from '../bll/store';
import {TaskDomainType, TaskStatuses} from '../api/task-api';

export type TaskPropsType = {
    todolistId: string
    task: TaskDomainType
}
const TaskWithRedux = memo(({task, todolistId}: TaskPropsType) => {
    const {id, title, status} = task
    const dispatch = useAppDispatch()
    const updateTaskTitle = useCallback((title: string) => dispatch(updateTaskTitleTC(todolistId, id, title)), [dispatch, todolistId, id])
    const removeTask = useCallback(() => dispatch(removeTaskTC(todolistId, id)), [dispatch, todolistId, id])
    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => dispatch(updateTaskStatusTC(todolistId, id, e.currentTarget.checked)), [dispatch, todolistId, id])
    return (<div>
            <Checkbox
                onChange={changeTaskStatus}
                checked={status === TaskStatuses.Completed}/>
            <span className={status ? 'task-done' : ''}>
                        <EditableSpan title={title} spanCallback={updateTaskTitle}
                                      disabled={status === TaskStatuses.Completed}/>
                    </span>
            <IconButton onClick={removeTask} aria-label="delete" size="small"
                        disabled={status === TaskStatuses.Completed}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </div>
    )
});

export default TaskWithRedux;
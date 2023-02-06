import {ChangeEvent, useEffect, useState} from 'react';
import {taskAPI, TaskAPIType} from '../api/task-api';
import {todolistAPI, TodolistAPIType} from '../api/todolist-api';

export default {
    title: 'API/TASKS'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolists, setTodolists] = useState<Array<TodolistAPIType>>([])
    const [todolistId, setTodolistId] = useState<string>()
    useEffect(() => {
        todolistAPI.getTodolists().then(res => {
            setTodolists(res.data)
            return res.data
        }).then((data) => setTodolistId(data[0]?.id))
    }, [])
    useEffect(() => {
        todolistId && taskAPI.getTasks(todolistId).then(res => setState(res.data))
    }, [todolistId])

    return <div>
        <Select dataArray={todolists} setItem={setTodolistId}/>
        <div>
            {JSON.stringify(state)}
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskName, setTaskName] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>()
    const [todolists, setTodolists] = useState<Array<TodolistAPIType>>([])
    useEffect(() => {
        todolistAPI.getTodolists().then(res => {
            setTodolists(res.data)
            return res.data
        }).then((data) => setTodolistId(data[0]?.id))
    }, [])

    const createTask = () => todolistId && taskAPI.createTask(todolistId, taskName).then(res => setState(res.data))
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => setTaskName(e.currentTarget.value)
    return <div>
        {state && JSON.stringify(state)}
        <div>
            <Select dataArray={todolists} setItem={setTodolistId}/>
            <Input value={taskName} onChange={onChangeInput} placeholder={'Task Title'}/>
            <Button name={'Create Task'} callback={createTask} disabled={!todolistId?.length || !taskName?.length}/>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolists, setTodolists] = useState<Array<TodolistAPIType>>([])
    const [todolistId, setTodolistId] = useState<string>()
    const [tasks, setTasks] = useState<Array<TaskAPIType>>([])
    const [taskId, setTaskId] = useState<string>()
    useEffect(() => {
        todolistAPI.getTodolists().then(res => {
            setTodolists(res.data)
            return res.data
        }).then((data) => setTodolistId(data[0]?.id))
    }, [state])
    useEffect(() => {
        todolistId && taskAPI.getTasks(todolistId).then(res => {
            setTasks(res.data.items)
            return res.data.items
        }).then((items) => setTaskId(items[0]?.id))
    }, [todolistId, state])

    const deleteTask = () => todolistId && taskId && taskAPI.deleteTask(todolistId, taskId).then(res => setState(res.data))

    return <div>
        <Select dataArray={todolists} setItem={setTodolistId}/>
        <Select dataArray={tasks} setItem={setTaskId}/>
        <Button name={'Delete task'} callback={deleteTask} disabled={!todolistId || !taskId}/>
        <div>
            {JSON.stringify(state)}
        </div>
    </div>

}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolists, setTodolists] = useState<Array<TodolistAPIType>>([])
    const [todolistId, setTodolistId] = useState<string>()
    const [tasks, setTasks] = useState<Array<TaskAPIType>>([])
    const [taskId, setTaskId] = useState<string>()
    const [newTaskTitle, setNewTaskTitle] = useState<string>()
    const task = tasks.find((t => t.id === taskId))
    useEffect(() => {
        todolistAPI.getTodolists().then(res => {
            setTodolists(res.data)
            return res.data
        }).then((data) => setTodolistId(data[0]?.id))
    }, [state])
    useEffect(() => {
        todolistId && taskAPI.getTasks(todolistId).then(res => {
            setTasks(res.data.items)
            return res.data.items
        }).then((items) => setTaskId(items[0]?.id))
    }, [todolistId, state])
    const updateTask = () => todolistId && taskId && task && newTaskTitle && taskAPI.updateTask(todolistId, taskId, {
        ...task,
        title: newTaskTitle
    }).then(res => {
        setNewTaskTitle('')
        setState(res)
    })

    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)
    return <div>

        <div>
            <Select dataArray={todolists} setItem={setTodolistId}/>
            <Select dataArray={tasks} setItem={setTaskId}/>
            <Input value={newTaskTitle || ''} onChange={onChangeTaskTitle}
                   placeholder={'New Task Title'}/>
            <Button name={'Update task'} callback={updateTask}
                    disabled={!todolistId || !taskId || !newTaskTitle?.length}/>
        </div>
        {JSON.stringify(state)}
    </div>
}
type SelectPropsType = {
    dataArray: Array<TodolistAPIType | TaskAPIType>
    setItem: (id: string) => void
}
const Select = ({dataArray, setItem}: SelectPropsType) => {
    const onChooseTodo = (e: ChangeEvent<HTMLSelectElement>) => {
        const foundItem = dataArray.find((todo) => todo.title === e.currentTarget.value)
        if (foundItem) setItem(foundItem.id)
    }
    const todolistsOptions = dataArray.map((todo) => <option key={todo.id}
                                                             value={todo.title}>{todo.title}</option>)
    return <select name="todolists" id="todolists" onChange={onChooseTodo}>
        {todolistsOptions}
    </select>
}
type InputType = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder: string
}
const Input = ({value, onChange, placeholder}: InputType) => {
    return <input type="text" value={value} onChange={onChange} placeholder={placeholder}/>

}
type ButtonType = {
    name: string
    callback: () => void
    disabled?: boolean
}
const Button = ({name, callback, disabled}: ButtonType) => {
    return <button onClick={callback} disabled={disabled}>{name}</button>

}    // const task = {
//     // description: 'description',
//     title: newTaskTitle,
//     // completed: false,
//     // status: 3,
//     // priority: 1,
//     // startDate: new Date(),
//     // deadline: new Date(),
//     // id: taskId,
//     // todoListId: todolistId,
//     // order: 5,
//     // addedDate: new Date(),
// }
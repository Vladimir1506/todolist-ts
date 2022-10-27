import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {
    let learnTasks: Array<TaskType> = [
        {id: 1, title: 'CSS&HTML', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ]
    return (<div className="App">
            <Todolist title='What to learn?' tasks={learnTasks}/>
        </div>
    );
}

export default App;

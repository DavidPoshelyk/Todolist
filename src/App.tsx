import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type  FilterType = 'all'|'completed'| 'active'

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    let [tasks, setTasks] = useState< Array<TaskType> >([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: false},
        {id: 3, title: "JS", isDone: true},
        {id: 4, title: "JS", isDone: false},
        {id: 5, title: "JS", isDone: true},
        {id: 6, title: "JS", isDone: false},
    ]);
    let [filter, setFilter] = useState<FilterType>('all')
    const RemoveTask = (id: number) => {
        let tasks01 = tasks.filter(t => t.id !== id)
        setTasks(tasks01)
    }
    const ChangeFilter = (value: FilterType) => {
        setFilter(value);
    }


    let tasksFortodolist = tasks;
    if (filter === "completed") {
        tasksFortodolist = tasks.filter(t => t.isDone === true);
    }
    if (filter === "active") {
        tasksFortodolist = tasks.filter(t => t.isDone === false);
    }


    return (
        <div className="App">
            <TodoList title="What to learn"
                      removetask={RemoveTask}
                      task={tasksFortodolist}
            changeFilter={ChangeFilter}/>
        </div>

    )
}


export default App;
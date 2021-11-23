import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";


type  PropsType = {
    title: string
    task: Array<TaskType>
    removetask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (title: string) => void
}


export function TodoList(props: PropsType) {

    //Filter Tasks
    const AllClick = () => {props.changeFilter('all')}
    const ActiveClick = () => {props.changeFilter('active')}
    const CompletedClick = () => {props.changeFilter('completed')}
    //Add tasks
    const ChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setLocalTitle(e.currentTarget.value)
    const KeyPressTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        debugger;
        if (e.key === "Enter" ) {
            Addtask();
        }
    }
    const [newTitle, setLocalTitle] = useState<string>('')
    const Addtask = () => {
        props.addTask(newTitle)
        setLocalTitle('')
    }

    const tasksJSX = props.task.map(t =>
        <li key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title} </span>
            <button onClick={() => {props.removetask(t.id)}}>x</button>
        </li>
    )



    return (
        < div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTitle}
                    onChange={ChangeTitle}
                    onKeyPress={KeyPressTitle}
                />
                <button onClick={Addtask}> +</button>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button onClick={AllClick}> All
                </button>
                <button onClick={ActiveClick}> Active
                </button>
                <button onClick={CompletedClick}> Completed
                </button>
            </div>
        </div>
    )
}
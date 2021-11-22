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
    const [title, setTitle] = useState<string>('')
    const ChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const KeyPressTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            Addtask();
        }
    }

    const tasksJSX = props.task.map(t =>
        <li key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title} </span>
            <button onClick={() => {
                props.removetask(t.id)
            }}>x
            </button>
        </li>
    )

    const Addtask = () => {
        props.addTask(title)
        setTitle('')
    }

    return (
        < div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={ChangeTitle}
                    onKeyPress={KeyPressTitle}
                />
                <button onClick={Addtask}> +</button>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter('all')
                }}> All
                </button>
                <button onClick={() => {
                    props.changeFilter('active')
                }}> Active
                </button>
                <button onClick={() => {
                    props.changeFilter('completed')
                }}> Completed
                </button>
            </div>
        </div>
    )
}
import React from 'react';
import {FilterType, TaskType} from "./App";


type  PropsType = {
    title: string
    task: Array<TaskType>
    removetask: (id:number) => void
    changeFilter: (value:FilterType) => void
}

export function TodoList(props: PropsType) {
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
                <input/>
                <button> + </button>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button onClick={ () => {props.changeFilter('all')} }> All </button>
                <button onClick={ () => {props.changeFilter('active')} }> Active </button>
                <button onClick={ () => {props.changeFilter('completed')} }> Completed </button>
            </div>
        </div>
    )
}
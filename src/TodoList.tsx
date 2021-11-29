import React, {ChangeEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";
import Button from './Button';
import InputTasks from './InputTasks';


type  PropsType = {
    title: string
    task: Array<TaskType>
    removetask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (newTitle: string) => void
    filter: FilterType
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}


export function TodoList({addTask, changeFilter, title, changeTaskStatus, ...props}: PropsType) {
    //Filter
    const AllClick = () => {
        changeFilter('all')
    }
    const CompletedClick = () => {
        changeFilter('completed')
    }
    const ActiveClick = () => {
        changeFilter('active')
    }

    const [error, setError] = useState<boolean>(false)
    const errorMessage = error ? <div style={{color: 'red'}}>Title is required!</div> : null
    //add
    const [newTitle, setLocalTitle] = useState<string>('')
    const Addtask = () => {
        const trimmend = newTitle.trim()
        if (trimmend) {
            setError(false)
            addTask(newTitle)
            setLocalTitle('')
        } else {
            setError(true)
        }


    }

    const tasksJSX = props.task.map(t => {
        const RemoveTask = () => {props.removetask(t.id)}
        const ChangeInput = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(t.id, e.currentTarget.checked)

        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input type="checkbox" checked={t.isDone} onChange={ChangeInput}/>
                <span>{t.title} </span>
                <button onClick={RemoveTask}>x</button>
            </li>)

    })
    return (
        < div>
            <h3>{title}</h3>
            <div>
                <InputTasks className={error ? "error" : ''} addtask={Addtask} newTitle={newTitle}
                            setLocalTitle={setLocalTitle}/>
                <Button callBack={Addtask} name={'+'}/>
                {errorMessage}
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <Button className={props.filter === "completed" ? "active" : ''} callBack={CompletedClick}
                    name={'completed'}/>
            <Button className={props.filter === "active" ? "active" : ''} callBack={ActiveClick} name={'active'}/>
            <Button className={props.filter === "all" ? "active" : ''} callBack={AllClick} name={'all'}/>

        </div>
    )
}
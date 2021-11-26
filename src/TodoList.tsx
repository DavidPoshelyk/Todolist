import React, {useState} from 'react';
import {FilterType, TaskType} from "./App";
import Button from './Button';
import ButtonFilter from './ButtonFilter';
import InputTasks from './InputTasks';


type  PropsType = {
    title: string
    task: Array<TaskType>
    removetask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (newTitle: string) => void
}


export function TodoList({addTask, changeFilter, title, ...props}: PropsType) {
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


    //add
    const [newTitle, setLocalTitle] = useState<string>('')
    const Addtask = () => {
        addTask(newTitle)
        setLocalTitle('')
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

    return (
        < div>
            <h3>{title}</h3>
            <div>
                <InputTasks addtask={Addtask} newTitle={newTitle} setLocalTitle={setLocalTitle}/>
                <Button callBack={Addtask} name={'+'}/>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <Button callBack={CompletedClick} name={'completed'}/>
            <Button callBack={ActiveClick} name={'active'}/>
            <Button callBack={AllClick} name={'all'}/>

        </div>
    )
}
import React, {useState} from 'react';
import {FilterType, TaskType} from "./App";
import ButtonAdd from './ButtonAdd';
import ButtonFilter from './ButtonFilter';
import InputTasks from './InputTasks';



type  PropsType = {
    title: string
    task: Array<TaskType>
    removetask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (newTitle: string) => void
}


export function TodoList({addTask,changeFilter,title,...props}: PropsType) {

    const [newTitle, setLocalTitle] = useState<string>('')
    const Addtask = () => {
        addTask(newTitle)
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
            <h3>{title}</h3>
            <div>
                <InputTasks addtask={Addtask} newTitle={newTitle} setLocalTitle={setLocalTitle}/>
                <ButtonAdd  Addtask={Addtask} name={'+'}/>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <ButtonFilter    value={'all'}   name={"All"} changeFilter={changeFilter} />
            <ButtonFilter    value={'completed'}   name={"Completed"} changeFilter={changeFilter} />
            <ButtonFilter    value={'active'}   name={"Active"} changeFilter={changeFilter} />
        </div>
    )
}
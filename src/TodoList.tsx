import { pink } from '@mui/material/colors';
import { Button } from '@material-ui/core';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import Input from './components/input';
import Editablespan from './Editablespan';
import './App.css'
import { ToggleButtonGroup } from '@material-ui/core';
import { ToggleButton } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';


 export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string,   value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistID:string
    RemoveTodolists: (todolistID: string)=> void
    EditableApp:(todolistID:string, id: string, title: string)=> void
    RemoveTitleApp:(todolistID: string, title: string) => void
}

export function Todolist(props: PropsType) {

    // let [title, setTitle] = useState("")
    // let [error, setError] = useState<string | null>(null)

    // const addTask = () => {
    //     if (title.trim() !== "") {
    //         props.addTask(props.todolistID, title.trim());
    //         setTitle("");
    //     } else {
    //         setError("Title is required");
    //     }
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }
    //
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }

    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");

    const  callbackHandler = (title: string) => {
        props.addTask(props.todolistID, title)
     }
   const RemoveTitle = (title: string) => {
       props.RemoveTitleApp(props.todolistID, title)

   }
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    return(
        <div >

               <Editablespan  title={props.title} EditTodolist={(title)=>  RemoveTitle(title)} />
             <button onClick={()=> props.RemoveTodolists(props.todolistID)}>X</button>

            <Input callbackHandler={callbackHandler}/>
            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? "error" : ""}*/}
            {/*/>*/}
            {/*<button onClick={addTask}>+</button>*/}
            {/*{error && <div className="error-message">{error}</div>}*/}

        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }
                    const EditTodolist = (title: string) => {
                        props.EditableApp(props.todolistID, t.id, title)

                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <div style={{display:'inline-flex'}} >
                        <Checkbox onChange={onChangeHandler} checked={t.isDone} {...label} defaultChecked color="secondary" />
                        <Editablespan title={t.title} EditTodolist={EditTodolist} />
                        <Button style={{maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px'}}
                                 variant="contained" onClick={onClickHandler}>X</Button>
                        </div>
                    </li>
                })
            }
        </ul>
        <div>
            <ToggleButtonGroup color="primary" value={props.filter} exclusive >
                    <ToggleButton value="all" onClick={onAllClickHandler}>All</ToggleButton>
                    <ToggleButton value="active" onClick={onActiveClickHandler}>Active</ToggleButton>
                    <ToggleButton value="completed" onClick={onCompletedClickHandler}>Completed</ToggleButton>
                </ToggleButtonGroup>







        </div>
    </div>
    )
}

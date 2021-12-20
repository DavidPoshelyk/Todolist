
import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import Input from './components/input';
import Editablespan from './Editablespan';
import './App.css'
import {Button, Checkbox, Fab } from '@mui/material';
import { ToggleButtonGroup } from '@mui/material';
import { ToggleButton } from '@mui/material';
import { Paper } from '@mui/material';
import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { pink } from '@mui/material/colors';



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

    const onClickHandler = (todolistID:string, id:string) => {
        props.removeTask(todolistID,id)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>,id: string) => {
        props.changeTaskStatus(props.todolistID, id, e.currentTarget.checked)
    }
     const EditTodolist = (title: string, id: string) => {
         props.EditableApp(props.todolistID, id, title)
     }

    return(
        <div >
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        minWidth: 200,
                        minHeight: 200,
                    },
                }}
            >


                <Paper elevation={3} >

                    <Editablespan   className='editableSpanList' title={props.title} EditTodolist={(title)=>  RemoveTitle(title)} />
                    <Fab style={{margin:'10px'}}  size="small" color="primary" aria-label="add">
                        <DeleteIcon onClick={()=> props.RemoveTodolists(props.todolistID)} />
                    </Fab>

                    <Input callbackHandler={callbackHandler}/>

                        {
                            props.tasks.map(t => {
                                return <ul key={t.id} className={t.isDone ? "is-done" : "ul"}>
                                    <div style={{display:'inline-flex'}} >
                                        <Checkbox onChange={(e)=> onChangeHandler(e,t.id)} sx={{
                                            color: pink[800],
                                            '&.Mui-checked': {
                                                color: pink[600],
                                            }}} checked={t.isDone} {...label} defaultChecked color="secondary" />
                                        <Editablespan title={t.title} EditTodolist={(title:string)=>EditTodolist(title, t.id)} />
                                        <IconButton aria-label="delete">
                                            <DeleteIcon  onClick={()=> onClickHandler(props.todolistID, t.id)} />
                                        </IconButton>
                                    </div>
                                </ul>
                            })
                        }

                    <div>
                        <ToggleButtonGroup  color="primary" value={props.filter} exclusive >
                            <ToggleButton style={{minWidth: 100, justifyContent:'center'}} value="all" onClick={onAllClickHandler}>All</ToggleButton>
                            <ToggleButton style={{minWidth: 100}} value="active" onClick={onActiveClickHandler}>Active</ToggleButton>
                            <ToggleButton style={{minWidth: 100}}value="completed" onClick={onCompletedClickHandler}>Completed</ToggleButton>
                        </ToggleButtonGroup>







                    </div> </Paper>
            </Box>


    </div>
    )
}

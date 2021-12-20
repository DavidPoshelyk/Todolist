import { Fab } from '@mui/material';
import { InputUnstyled } from '@mui/material';
import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import ConstructionIcon from '@mui/icons-material/Construction';
import './App.css'



type EditablespanType = {
    title: string
    EditTodolist:(title: string)=> void
    className?:string
}


const Editablespan = (props:EditablespanType) => {
    const [edit, setEdit] = useState(false)
    const [newtitele, setnewtitele ] = useState(props.title)

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        setnewtitele(e.currentTarget.value)
    }


    return (edit ? <InputUnstyled onChange={onChange} value={newtitele} onBlur={() => {
                setEdit(false)
                props.EditTodolist(newtitele)
            }} autoFocus/> :  <span  className={props.className||"spanInput"}  onDoubleClick={() => setEdit(true)}>{props.title}</span>

    )
}

export default Editablespan;
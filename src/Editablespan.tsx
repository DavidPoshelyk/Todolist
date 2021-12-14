import React, { useState } from 'react';

type EditablespanType = {
    title: string
    EditTodolist:(title: string)=> void
}

const Editablespan = (props:EditablespanType) => {
    const [edit, setEdit] = useState(false)
    const [newtitele, setnewtitele ] = useState(props.title)



    return ( edit? <input onChange={(e)=> setnewtitele(e.currentTarget.value)} value={newtitele}  onBlur={()=> {
                setEdit(false)
                props.EditTodolist(newtitele)

            }} autoFocus />:
            <span onDoubleClick={()=>setEdit(true) }>{props.title}</span>



    )}

export default Editablespan;
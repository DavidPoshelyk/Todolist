import React, { useState } from 'react';

type EditablespanType = {
    title: string
}

const Editablespan = (props:EditablespanType) => {
    const [edit, setEdit] = useState(false)

    return (
        edit? <input value={props.title}  onBlur={()=> setEdit(false)} autoFocus />:
            <span onDoubleClick={()=>setEdit(true) }>{props.title}</span>


);
};

export default Editablespan;
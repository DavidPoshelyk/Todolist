import { styled } from '@material-ui/core';
import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import InputUnstyled, { InputUnstyledProps } from '@mui/base/InputUnstyled';

type EditablespanType = {
    title: string
    EditTodolist:(title: string)=> void
}
const StyledInputElement = styled('input')`
      width: 150px;
      font-size: 1rem;
      font-family: IBM Plex Sans, sans-serif;
      font-weight: 300;
      line-height: 1.4375em;
      background: rgb(243, 246, 249);
      border: 1px solid #e5e8ec;
      border-radius: 10px;
      padding: 6px 10px;
      color: #20262d;
      transition: width 300ms ease;

      &:hover {
        background: #ffffff;
        border-color: #e5e8ec;
      }

      &:focus {
        outline: none;
        width: 120px;
        transition: width 200ms ease-out;
      }
    `;

const Editablespan = (props:EditablespanType) => {
    const [edit, setEdit] = useState(false)
    const [newtitele, setnewtitele ] = useState(props.title)

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        setnewtitele(e.currentTarget.value)
    }


    return (edit ? <InputUnstyled   components={{Input: StyledInputElement}}
                                  onChange={onChange} value={newtitele} onBlur={() => {
                setEdit(false)
                props.EditTodolist(newtitele)
            }} autoFocus/> :

            <span onDoubleClick={() => setEdit(true)}>{props.title}</span>
    )
}

export default Editablespan;
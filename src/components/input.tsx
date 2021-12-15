import { Button, styled } from '@material-ui/core';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, {ChangeEvent,KeyboardEvent, useState } from 'react';
import InputUnstyled, { InputUnstyledProps } from '@mui/base/InputUnstyled';

type TypeInput = {
    callbackHandler:(title:string)=> void
}

const StyledInputElement = styled('input')`
      width: 200px;
      font-size: 1rem;
      font-family: IBM Plex Sans, sans-serif;
      font-weight: 400;
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
        width: 220px;
        transition: width 200ms ease-out;
      }
    `;
const Input = (props:TypeInput) => {


    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    const addTask = () => {
        if (title.trim() !== "") {
            props.callbackHandler(title.trim())
            // props.addTask(props.todolistID, title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    return (
        <div >
            <div style={{display:'inline-flex'}}>
            <InputUnstyled style={ error ? {border: "4px solid red", borderRadius: "10px "}:{}} onKeyPress={onKeyPressHandler} value={title} onChange={onChangeHandler} components={{ Input: StyledInputElement }} {...props} placeholder={ error ? error: '' }  />
            <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                         variant="contained" onClick={addTask}>+</Button></div>


        </div>
    );
};

export default Input;
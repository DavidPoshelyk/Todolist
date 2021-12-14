import { Button } from '@material-ui/core';
import React, {ChangeEvent,KeyboardEvent, useState } from 'react';

type TypeInput = {
    callbackHandler:(title:string)=> void
}


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
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <Button  style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                     variant="contained"onClick={addTask}>+</Button>

            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default Input;
import React, {KeyboardEvent, ChangeEvent} from 'react';

type TypeInputTasks = {
    addtask: () => void
    setLocalTitle: (newTitle: string) => void
    newTitle: string
    className:string
    setError:(error:boolean)=>void
}

const InputTasks = ({addtask, newTitle, setLocalTitle,setError, ...props}: TypeInputTasks) => {
    const ChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setLocalTitle(e.currentTarget.value)
    const KeyPressTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === "Enter") {
            addtask();
        }
    }

    return (
        <input className={props.className}
            value={newTitle}
            onChange={ChangeTitle}
            onKeyPress={KeyPressTitle}
        />)
}
export default InputTasks;
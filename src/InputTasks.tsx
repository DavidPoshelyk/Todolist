import React, {KeyboardEvent, ChangeEvent} from 'react';

type TypeInputTasks = {
    addtask: () => void
    setLocalTitle: (newTitle: string) => void
    newTitle: string
}

const InputTasks = ({addtask, newTitle, setLocalTitle, ...props}: TypeInputTasks) => {
    const ChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setLocalTitle(e.currentTarget.value)
    const KeyPressTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addtask();
        }
    }

    return (
        <input
            value={newTitle}
            onChange={ChangeTitle}
            onKeyPress={KeyPressTitle}
        />)
}
export default InputTasks;
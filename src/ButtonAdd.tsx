import React from 'react';

type TypeButtonAdd = {
    Addtask: () => void
    name: string
}

const ButtonAdd = ({name, Addtask, ...props}: TypeButtonAdd) => {

    return (
        <button onClick={Addtask}>{name}</button>
    )

}
export default ButtonAdd;
import React from 'react';

type TypeButton = {
    callBack: () => void
    name: string
}

const Button = ({name, callBack, ...props}: TypeButton) => {

    return (
        <button onClick={callBack}>{name}</button>
    )

}
export default Button;
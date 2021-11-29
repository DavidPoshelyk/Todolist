import React from 'react';

type TypeButton = {
    callBack: () => void
    name: string,
    className?:string
}

const Button = ({name, callBack, ...props}: TypeButton) => {

    return (
        <button className={props.className} onClick={callBack}>{name}</button>
    )

}
export default Button;
import React from 'react';
import { FilterType } from './App';

type TypeButtonFilter = {
    changeFilter:(value: FilterType) => void
    name:string
    value:FilterType
}

const ButtonFilter = ({changeFilter,name,value,...props}:TypeButtonFilter) => {
    const AllClick = () => {changeFilter(value)}

    return(
        <button onClick={AllClick}> {name}</button>
    )

}
export default ButtonFilter;
import { Fab } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Input from './components/input';
import './App.css'

type InputAddListType = {
    AddTodolists:(title:string)=> void
}
const InputAddList = (props:InputAddListType) => {

    const[bubbles, setBubbles] = useState<boolean>(true)


    return (

        <div>
            {bubbles ? <span className='inputAddList'  onBlur={()=> setBubbles(!bubbles)}>
                    <b style={{marginLeft:'20px'}}>Add New list </b>
                    <Input  callbackHandler={(title:string)=> props.AddTodolists(title)} />
            </span> :
                <Fab style={{margin:'10px'}}  size="small" color="secondary" aria-label="add">
                <AddIcon onClick={(e)=> setBubbles(!bubbles)} />
            </Fab>  }
        </div>
    );
};

export default InputAddList;
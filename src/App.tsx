import React from 'react'
import './App.css';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import {TaskType} from './api/todolists-api'
import TodoLists from "./Todolists";
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import {AppBar} from "@mui/material";
import {useSelector} from "react-redux";
import {ErrorSnackbar} from "./ErrorSnackbar/ErrorSnackbar";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    const status = useSelector<any, any>(state=> state.app.status )
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color="inherit" />}
            </AppBar>
            <Container fixed>
                <TodoLists/>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;

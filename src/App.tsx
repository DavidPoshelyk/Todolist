import React, {useState,useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {AddItemForm} from "./AddItemForm";
import {Menu} from "@mui/icons-material";
import {addTodolistAC, changeFilterAC, changeTodolistTitleAC, ReducerList, removeTodolistAC } from './Reducer/Reducer-List';
import {addTaskAC, addTaskList, changeStatusAC, changeTaskTitleAC, deleteTaskListAC, ReducerTask, removeTaskAC } from './Reducer/Reducer-Task';
import {useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './Redux/Redux';


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export  type TasksStateType = {
    [key: string]: Array<TaskType>
}

// export let todolistId1 = v1();
// export let todolistId2 = v1();

function App() {
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>((state)=> state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>((state)=> state.tasks)
    const dispatch = useDispatch()




    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id,todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title,todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeFilterAC(value,todolistId))


    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeStatusAC(id, isDone, todolistId))

    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(id,newTitle,todolistId))
    }

    function removeTodolist(id: string) {
        dispatch(removeTodolistAC(id))
        dispatch(deleteTaskListAC(id))
            //???  delete tasks[id];
        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        // setTodolists(todolists.filter(tl => tl.id != id));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
       // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        // setTasks({...tasks});
    }

    function changeTodolistTitle(id: string, title: string) {
        dispatch(changeTodolistTitleAC(id,title))

    }


    // let [todolists, dispatchList] = useReducer(ReducerList,[
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ])
    //
    // let [tasks, dispatchTask] = useReducer(ReducerTask,{
    //     [todolistId1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true}
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "React Book", isDone: true}
    //     ]
    // });

    function addTodolist(title: string) {
        let newId = v1()
        dispatch(addTodolistAC(title,newId))
        dispatch(addTaskList(newId))

    }

    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{padding:"20px"}}><AddItemForm addItem={addTodolist}/></Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default App;

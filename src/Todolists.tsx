import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {
    addTodolistThunk,
    changeTodolistFilterAC, changeTodolistTitleThunk,
    FilterValuesType,
    removeTodolistThunk, setTodolistsThunk,
    TodolistDomainType
} from "./state/todolists-reducer";
import {addTasksThunk, removeTaskThunk, updateTask} from "./state/tasks-reducer";
import {TaskStatuses} from "./api/todolists-api";
import {TasksStateType} from "./App";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";

const TodoLists = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    const removeTask = useCallback(function (todolistId: string, taskId: string) {
        const action = removeTaskThunk(todolistId, taskId);
        dispatch(action);
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        const action = addTasksThunk(title, todolistId);
        dispatch(action);
    }, []);

    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
        const action = updateTask(taskId, {status}, todolistId);
        dispatch(action);
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const action = updateTask(id, {title: newTitle}, todolistId);
        dispatch(action);
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        const action = removeTodolistThunk(id);
        dispatch(action);
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const action = changeTodolistTitleThunk(id, title);
        dispatch(action);
    }, []);

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistThunk(title);
        dispatch(action);
    }, [dispatch]);

    useEffect(() => {
        dispatch(setTodolistsThunk())
    }, [])

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists && todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                id={tl.id}
                                title={tl.title}
                                tasks={allTodolistTasks}
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
        </>
    );
};

export default TodoLists;
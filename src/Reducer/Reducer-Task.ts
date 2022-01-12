import React from 'react';
import { v1 } from 'uuid';
import { TasksStateType } from '../App';
import { TaskType } from '../Todolist';
let initialState:TasksStateType = {}

export const ReducerTask = (tasks:TasksStateType = initialState, actoin:typeAction) => {
   switch (actoin.type) {
       case 'ADD-TASK-LIST' : {return {...tasks, [actoin.newId]:[]}}
       case 'REMOVE-TASK':{ let remove  = tasks[actoin.todolistId]
           tasks[actoin.todolistId] = remove.filter(f=> f.id != actoin.id);
           return {...tasks}}
       case 'ADD-TASK': {

           let task:TaskType = {id: v1(), title: actoin.title, isDone: false};
           let todolistTasks = tasks[actoin.todolistId];
           tasks[actoin.todolistId] = [task, ...todolistTasks];
       return {...tasks}}
       case 'CAHNGE-STATUS': {
           let todolistTasks = tasks[actoin.todolistId];
           let task = todolistTasks.find(t => t.id === actoin.id);
           if (task) {task.isDone = actoin.isDone;}
           return {...tasks}}
       case "CHANGE-TASKS-TITLE":{
           let todolistTasks = tasks[actoin.todolistId];
           let task = todolistTasks.find(t => t.id === actoin.id);
           if (task) {task.title = actoin.newTitle;}
           return {...tasks}
       }
       case "DELETE-TASK-LIST": {
           delete  tasks[actoin.id]
           console.log({...tasks})
           return {...tasks}
       }


       default:return tasks
   }
};

type typeAction = addTaskACType|removeTaskACType|addTaskType|changeStatusACType|changeTaskTitleACType|deleteTaskListACType


type addTaskACType  = ReturnType<typeof addTaskList>
type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskType = ReturnType<typeof addTaskAC>
type changeStatusACType = ReturnType<typeof changeStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type deleteTaskListACType = ReturnType<typeof deleteTaskListAC>
export const addTaskList = (newId:string) => {return{type:'ADD-TASK-LIST', newId }as const}
export const deleteTaskListAC = (id:string) => {return{type:'DELETE-TASK-LIST', id }as const}
export const removeTaskAC = (id: string, todolistId: string) => {return{type:'REMOVE-TASK', id, todolistId}as const}
export const addTaskAC = (title: string, todolistId: string) => {return{type:'ADD-TASK', title, todolistId}as const}
export const changeStatusAC = (id: string, isDone: boolean, todolistId: string) => {return{type:'CAHNGE-STATUS', id, isDone, todolistId}as const}
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {return{type: 'CHANGE-TASKS-TITLE', id , newTitle, todolistId}as const}
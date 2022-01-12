import React from 'react';
import { v1 } from 'uuid';
import { FilterValuesType, TodolistType } from '../App';
import { TaskType } from '../Todolist';

let initialState:Array<TodolistType> = []

export  const ReducerList = (todolist:Array<TodolistType> = initialState, action:typeAction) => {
   switch (action.type) {
       case 'FILTER-LIST':{return todolist.map(m=> m.id === action.todolistId? {...m, filter:action.value}:m)}
       case  'REMOVE-LIST':{return todolist.filter(f=> f.id != action.id)}
       case 'CHANGE-TITLE-LIST': {return todolist.map(m=> m.id === action.id? {...m, title:action.title}:m)}
       case 'ADD-TODOLIST': { let newList:TodolistType = {id: action.newId, title: action.title, filter: 'all'}
           return [newList,...todolist]}

       default:return todolist
   }
};



type typeAction = changeFilterACType|removeTodolistACType|changeTodolistTitleACType|addTodolistACType

type changeFilterACType = ReturnType<typeof changeFilterAC>
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type addTodolistACType = ReturnType<typeof addTodolistAC>
export const changeFilterAC = (value:FilterValuesType,todolistId: string ) => {return{type:'FILTER-LIST',value,todolistId}as const}
export const removeTodolistAC = (id:string) => {return{type:'REMOVE-LIST',id}as const}
export const changeTodolistTitleAC = (id: string, title: string) => {return{type:'CHANGE-TITLE-LIST', id, title}as const}
export const addTodolistAC = (title: string, newId:string) => {return{type:'ADD-TODOLIST', title,newId}as const}

//---------------------------------------------------------------------
// import React from 'react';
// import { v1 } from 'uuid';
//
//
// export  const TaskReducer = (state:Array<TaskType>, action:tsarType) => {
//     switch (action.type) {
//         case 'REMOVE-TASK': {return state.filter(f=> f.id !== action.id)}
//         case "ADD-TASKS": {return [{ id: v1(), title: action.title, isDone: false },...state]}
//         default:return state
//     }
// };
// type tsarType = removeTasksACType|addtaskACType
//
// type removeTasksACType = ReturnType<typeof removeTasksAC>
// type addtaskACType = ReturnType<typeof addtaskAC>
//
// export const removeTasksAC = (id: string) => {return{type: 'REMOVE-TASK', id} as const}
// export const addtaskAC = (title:string) => {return{type: 'ADD-TASKS', title:title}as const}
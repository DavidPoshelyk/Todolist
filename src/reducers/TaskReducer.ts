import React from 'react';
import { v1 } from 'uuid';
import { TaskType } from '../Todolist';

 export  const TaskReducer = (state:Array<TaskType>, action:tsarType) => {
  switch (action.type) {
      case 'REMOVE-TASK': {return state.filter(f=> f.id !== action.id)}
      case "ADD-TASKS": {return [{ id: v1(), title: action.title, isDone: false },...state]}
      default:return state
  }
};
 type tsarType = removeTasksACType|addtaskACType

 type removeTasksACType = ReturnType<typeof removeTasksAC>
 type addtaskACType = ReturnType<typeof addtaskAC>

 export const removeTasksAC = (id: string) => {return{type: 'REMOVE-TASK', id} as const}
export const addtaskAC = (title:string) => {return{type: 'ADD-TASKS', title:title}as const}
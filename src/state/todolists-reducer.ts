import { v1 } from 'uuid';
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";

 export type addTodolistACType = ReturnType<typeof addTodolistAC>
 export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
 export type setTodolistsACType =  ReturnType<typeof setTodolistsAC>

type ActionsType =
    | removeTodolistACType
    | addTodolistACType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | setTodolistsACType


const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]
export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state:Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolist.id,
                title: action.todolist.title,
                filter: 'all',
                addedDate: action.todolist.addedDate,
                order: action.todolist.order
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }

        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }

        default:
            return state;
    }
}

//action
 const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST',  todolistId} as const
}
const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST',todolist} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const
}
const setTodolistsAC = (todolists: TodolistType[]) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}
//thunk
export  const setTodolistsThunk = () => {
    return (dispatch:Dispatch) => {
        todolistsAPI.getTodolists()
            .then((res)=> {
                console.log(res.data)
                dispatch(setTodolistsAC(res.data))})

    }
}
export const addTodolistThunk = (title:string) => {
    return (dispatch:Dispatch)=>{
        todolistsAPI.createTodolist(title)
            .then((res)=>{
                const  list = res.data.data.item
                const action = addTodolistAC(list)
                dispatch(action)
            })


    }


}
export const removeTodolistThunk = (todolistId:string)=> {
    return (dispatch:Dispatch) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then((res)=>{
                if(res.data.resultCode === 0){
                    dispatch(removeTodolistAC(todolistId))
                }

            })
    }
}




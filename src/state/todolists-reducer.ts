import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";




export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type setTodolistsACType = ReturnType<typeof setTodolistsAC>

type ActionsType =
    | removeTodolistACType
    | addTodolistACType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | setTodolistsACType
|ReturnType<typeof changeEntityStatusAC>


const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]
export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
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
                order: action.todolist.order,
                entityStatus:'idle'

            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(m => m.id === action.id ? {...m, title: action.title} : m)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(m => m.id === action.id ? {...m, filter: action.filter} : m)
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus:'idle'}))
        }
        case "CHANGE-ENTITY-STATUS": {
            return state.map(m => m.id === action.id ? {...m, entityStatus:action.entityStatus} : m)

        }
        default:
            return state;
    }
}

//action
const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId} as const)
const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
const changeTodolistTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists} as const)
export const changeEntityStatusAC = (id:string, entityStatus:RequestStatusType) => {
    return{type:'CHANGE-ENTITY-STATUS', id, entityStatus }  as  const
  
}
//thunk
export const setTodolistsThunk = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))


        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('idle'))
            })

    }
}
export const addTodolistThunk = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                if(res.data.resultCode === 0 ){
                    const list = res.data.data.item
                    const action = addTodolistAC(list)
                    dispatch(action)

                }else {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                }
                dispatch(setAppStatusAC('idle'))

            })


    }


}
export const removeTodolistThunk = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeEntityStatusAC(todolistId, 'loading'))

        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC(todolistId))
                    dispatch(setAppStatusAC('idle'))
                    dispatch(changeEntityStatusAC(todolistId, 'idle'))


                }
            })
    }
}
export const changeTodolistTitleThunk = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.updateTodolist(id, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = changeTodolistTitleAC(id, title)
                    dispatch(action)
                    dispatch(setAppStatusAC('idle'))
                }
            })
    }

}




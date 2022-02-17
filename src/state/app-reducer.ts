import {Dispatch} from "redux";
import {todolistsAPI} from "../api/todolists-api";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string  | null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}


export const setAppStatusAC = (status:RequestStatusType) => {
    return {type:'APP/SET-STATUS', status} as const

}
export const setAppErrorAC = (error:null|string) => {
    return {type:'APP/SET-ERROR', error} as const

}
type setAppStatusACType = ReturnType<typeof setAppStatusAC>
type setAppErrorACType = ReturnType<typeof setAppErrorAC>

type ActionsType = setAppStatusACType|setAppErrorACType

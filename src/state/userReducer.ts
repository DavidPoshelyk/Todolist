import { TodolistType } from "../App"

export const  todolistsReducer = (state: Array<TodolistType>, action: rmoveTodolistACType):Array<TodolistType> => {
    switch (action.type) {
         case 'REMOVE-TODOLIST' : {
             let newState = [...state]
             return newState.filter(f=> f.id != action.id)
         }

default: return state
    }
}
type rmoveTodolistACType = ReturnType<typeof rmoveTodolistAC>
export  const rmoveTodolistAC = (id:string) => {return{type: 'REMOVE-TODOLIST', id} as const}
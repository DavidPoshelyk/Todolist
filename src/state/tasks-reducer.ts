import {TasksStateType} from '../App';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from '../api/todolists-api'
import {addTodolistACType, removeTodolistACType, setTodolistsACType} from "./todolists-reducer";
import {Dispatch} from 'redux';
import {AppRootStateType} from "./store";


type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | setTodolistsACType
    | addTodolistACType
    | removeTodolistACType
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof addTaskAC>


const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;

        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }

        case 'UPDATE-TASK': {
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(m => m.id === action.taskId? (action.task) : (m))
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.todolistId];
            return copyState;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }

        default:
            return state;
    }
}

const removeTaskAC = (todolistId: string, taskId: string,) => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const
}
const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
const updateTaskAC = (taskId:string,todolistId:string, task: TaskType) => {
    return {type: 'UPDATE-TASK', taskId,todolistId,task} as const
}
const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}

//thunk
export const fetchTasksThunk = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
}
export const createTasksThunk = (title: string, todolistId: string,) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
            })
    }

}
export const removeTaskThunk = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                const action = removeTaskAC(todolistId, taskId)
                dispatch(action)

            })
    }

}

export const updateTask = (taskId: string, newModel: UpdateTaskModelTypeThunk, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState().tasks
        const task = state[todolistId].find(f => f.id === taskId)
        if (!task) {
            console.warn('there is no such task in the state')
            return
        }
        const model: UpdateTaskModelTypeThunk = {
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            title: task.title,
            status: task.status,
            ...newModel
        }
        todolistsAPI.updateTask(taskId, todolistId, model)
            .then((res) => {
                const task = res.data.data.item
                const action = updateTaskAC(taskId,todolistId,task)
                dispatch(action)
            })
    }

}

 export type UpdateTaskModelTypeThunk = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}



import { v1 } from 'uuid';
import { TasksStateType, todolistId1, todolistId2, TodolistType } from '../App';
import {ReducerList, removeTodolistAC } from './Reducer-List';
import {addTaskAC, deleteTaskListAC, ReducerTask, removeTaskAC } from './Reducer-Task';


test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };

    const action = removeTaskAC("2", "todolistId2");
    // const addTaskAC = (title: string, todolistId: string) => {return{type:'ADD-TASK', title, todolistId}as const}


    const endState = ReducerTask(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "3", title: "tea", isDone: false}
        ]
    });
});
test('add task ', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };


     const  action = addTaskAC("hi david", "todolistId1" )


    const endState = ReducerTask(startState, action)

    expect(endState["todolistId1"].length).toBe(4);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId1"][0].title).toBe("hi david");
    expect(endState["todolistId2"][0].isDone).toBe(false);
})
test("delete list", () => {
let statelist:Array<TodolistType> = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
]
    let statetasks:TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }

        const actionlist = deleteTaskListAC(todolistId1)
       const actiontasks =  removeTodolistAC(todolistId1)

    const endStatetasks  = ReducerTask(statetasks, actionlist)
    const endStateList  = ReducerList(statelist, actiontasks)


   expect(endStateList.length).toBe(1)
   expect(endStatetasks).not.toBe(endStatetasks[todolistId1])
})


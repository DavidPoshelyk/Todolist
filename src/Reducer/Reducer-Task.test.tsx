import { v1 } from 'uuid';
import { TasksStateType,  TodolistType } from '../App';
import {ReducerList, removeTodolistAC } from './Reducer-List';
import {addTaskAC, deleteTaskListAC, ReducerTask, removeTaskAC } from './Reducer-Task';

let  todolistId1:string = v1()
let  todolistId2:string = v1()
let statelist: Array<TodolistType>
let statetasks: TasksStateType
let id1:string = v1()
let id2:string = v1()
let id3:string = v1()
let id4:string = v1()

beforeEach(()=> {
     statelist = [
            {id: todolistId1, title: "What to learn", filter: "all"},
            {id: todolistId2, title: "What to buy", filter: "all"}
        ]
    statetasks = {
            [todolistId1]: [
                {id: id1, title: "HTML&CSS", isDone: true},
                {id: id2, title: "JS", isDone: true}
            ],
            [todolistId2]: [
                {id: id3 , title: "Milk", isDone: true},
                {id: id4, title: "React Book", isDone: true}
            ]
        }
    }
)

test('correct task should be deleted from correct array', () => {


    const action = removeTaskAC(id1, todolistId1);
    const endState = ReducerTask(statetasks, action)

    expect(endState).not.toBe({[todolistId1]:{id: id1, title: "HTML&CSS", isDone: true}});
    expect(endState).toBe({[todolistId1]:{id: id2, title: "JS", isDone: true}});
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


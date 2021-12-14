import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import Input from './components/input';

export type FilterValuesType = "all" | "active" | "completed";

type todolistsType = {
    id: string,
    title: string,
    filter:FilterValuesType
}
type TasksStateType = {
    [key: string]: TaskType[]
}



function App() {

    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>(
        {
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTask(todolistID: string, id: string) {
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
        setTasks({...tasks, [todolistID]:tasks[todolistID].filter(m=> m.id !== id)})
    }

    function addTask(todolistID: string, title: string) {
        let newtask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]:[newtask,...tasks[todolistID]]});
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {



         setTasks({...tasks, [todolistID]:tasks[todolistID].map(f => f.id === taskId ? {...f, isDone} : f)})
    }






    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(m => m.id === todolistID ? {...m, filter:value}:m))
    }

     const RemoveTodolists = (todolistID: string) => {
       let result = todolists.filter(m=> m.id !== todolistID)
        setTodolists(result)
    }
    const AddTodolists = (title:string) => {
     let Id = v1()
      let NewTasks:todolistsType ={id:Id, title, filter:'all'}
        setTodolists([NewTasks,...todolists])
        setTasks({...tasks, [Id]:[]})
    }


    return (
        <div className="App">

            <Input callbackHandler={(title:string)=>AddTodolists(title) }/>

            {todolists.map(m=> {
                let tasksForTodolist = tasks[m.id];

                if (m.filter === "active") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone === false);
                }
                if (m.filter === "completed") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone === true);
                }



                return(
                    <Todolist
                        todolistID={m.id}
                        key={m.id}
                        title={m.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={m.filter}
                        RemoveTodolists={RemoveTodolists}
                    />
                )}
            )}


        </div>
    );
}

export default App;

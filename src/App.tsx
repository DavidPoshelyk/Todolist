import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';
import {addtaskAC, removeTasksAC, TaskReducer } from './reducers/TaskReducer';
import {filterAC, FilterReducer } from './reducers/FilterReducer';

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, tasksDispatch] = useReducer(TaskReducer,[
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);

    function removeTask(id: string) {

        tasksDispatch(removeTasksAC(id))
    }

    function addTask(title: string) {
        tasksDispatch(addtaskAC(title))
    }

    let [filter, filterDispatch] = useReducer(FilterReducer,'all');

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    };
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        filterDispatch(filterAC(value));
    }



    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask} />
        </div>
    );
}

export default App;

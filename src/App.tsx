import React, {useState} from 'react';
import './App.css';
import Todolist, {TasksType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";


export type FilterValuesType = "all" | "completed" | "active";


type TodolistType = {
    id: string
    title: string
    filter: string
}

type TaskStateType = {
    [key: string]: Array<TasksType>
}

function App() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
    })

    function addTodolist(title: string) {
        let newTodolistId = v1();
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }

    const removeTask = (id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId];//из объекта берем свойство(нужный массив todolistId)
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }


    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value
            setTasks({...tasks})
        }
    }

    function addTasks(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks})
        }
    }

    function removeTodolist(todolistId: string) {
        setTodolists((todolists.filter(tl => tl.id !== todolistId)))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists])
        }
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    let allTodolistTask = tasks[tl.id]
                    let tasksForTodolist = allTodolistTask;
                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTask.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTask.filter(t => t.isDone === true);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTasks={addTasks}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })}

        </div>
    );
}

export default App;

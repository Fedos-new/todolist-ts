import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskStatuses, TaskType, TodoTaskPriorities} from './api/todolist-api';
import {FilterValuesType, TodolistDomainType} from './state/todolists-reducer';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todoListId1, title: "What to learn", filter: "all", addedDate: '',
            order: 0},
        {id: todoListId2, title: "What to buy", filter: "all",addedDate: '',
            order: 0}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId:todoListId1,
                addedDate: '', deadline: '', description: '', startDate:'', order: 0, priority: TodoTaskPriorities.Hi},
            {id: v1(), title: "JS", status: TaskStatuses.InProgress, todoListId:todoListId1,
                addedDate: '', deadline: '', description: '', startDate:'', order: 0, priority: TodoTaskPriorities.Hi},
            {id: v1(), title: "React", status: TaskStatuses.InProgress, todoListId:todoListId1,
                addedDate: '', deadline: '', description: '', startDate:'', order: 0, priority: TodoTaskPriorities.Hi},
            {id: v1(), title: "Rest API", status: TaskStatuses.Draft, todoListId:todoListId1,
                addedDate: '', deadline: '', description: '', startDate:'', order: 0, priority: TodoTaskPriorities.Hi},
            {id: v1(), title: "GraphQL", status: TaskStatuses.New, todoListId:todoListId1,
                addedDate: '', deadline: '', description: '', startDate:'', order: 0, priority: TodoTaskPriorities.Hi}
        ],
        [todoListId2]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId:todoListId2,
                addedDate: '', deadline: '', description: '', startDate:'', order: 0, priority: TodoTaskPriorities.Hi},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId:todoListId2,
                addedDate: '', deadline: '', description: '', startDate:'', order: 0, priority: TodoTaskPriorities.Hi},
            {id: v1(), title: "React", status: TaskStatuses.Completed, todoListId:todoListId2,
                addedDate: '', deadline: '', description: '', startDate:'', order: 0, priority: TodoTaskPriorities.Hi},
            {id: v1(), title: "Rest API", status: TaskStatuses.Completed, todoListId:todoListId2,
                addedDate: '', deadline: '', description: '', startDate:'', order: 0, priority: TodoTaskPriorities.Hi},
            {id: v1(), title: "GraphQL", status: TaskStatuses.Completed, todoListId:todoListId2,
                addedDate: '', deadline: '', description: '', startDate:'', order: 0, priority: TodoTaskPriorities.Hi}
        ],
    })


    function removeTask (id: string, todolistId: string) {
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
        let task = {id: v1(), title: title, status: TaskStatuses.New, todoListId:todolistId,
            addedDate: '', deadline: '', description: '', startDate:'', order: 0, priority: TodoTaskPriorities.Hi};
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }

    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.status = status;
            setTasks({...tasks})
        }
    }


    function addTodolist(title: string) {
        let newTodolistId = v1();
        let newTodolist: TodolistDomainType = {id: newTodolistId, title: title, filter: 'all', addedDate: '',
            order: 0};
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
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
        setTodolists((todolists.filter(tl => tl.id != todolistId)))
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
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: "5px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTask = tasks[tl.id]
                            let tasksForTodolist = allTodolistTask;
                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTask.filter(t => t.status === TaskStatuses.New);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTask.filter(t => t.status === TaskStatuses.Completed);
                            }

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                <Todolist
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
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;

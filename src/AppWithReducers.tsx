import React, {useReducer, useState} from 'react';
import './App.css';
import Todolist, {TasksType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, IconButton, Toolbar, Typography, Button, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTitleStatusAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type FilterValuesType = "all" | "completed" | "active";


export type TodolistType = {
    id: string
    title: string
    filter: string
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithReducers() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer,[
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ])

    let [tasks,  dispatchToTasksReducer] = useReducer(tasksReducer ,{
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


    function removeTask (id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todoListId2, value)
        dispatchToTodolistsReducer(action)
    }

    function addTasks(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatchToTasksReducer(action)
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        const action = changeTitleStatusAC(id, newTitle, todolistId)
        dispatchToTasksReducer(action)
    }

    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action)
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatchToTodolistsReducer(action)
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
                                tasksForTodolist = allTodolistTask.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTask.filter(t => t.isDone === true);
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

export default AppWithReducers;

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
    removeTodolistAC, todoListId1, todoListId2,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTitleStatusAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


export type FilterValuesType = "all" | "completed" | "active";


export type TodolistType = {
    id: string
    title: string
    filter: string
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithRedux() {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootState, Array<TodolistType>>((store) => store.todolist)
    const tasks = useSelector<AppRootState, TasksStateType>((store) => store.tasks)


    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatch(action)
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(value, todolistId)
        dispatch(action)
    }

    function addTasks(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId)
        dispatch(action)
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatch(action)
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)

    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        const action = changeTitleStatusAC(id, newTitle, todolistId)
        dispatch(action)
    }

    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatch(action)
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

export default AppWithRedux;

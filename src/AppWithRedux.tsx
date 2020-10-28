import React, {useCallback, useEffect} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, IconButton, Toolbar, Typography, Button, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC, fetchTodolistsTS, FilterValuesType,
    removeTodolistTC, TodolistDomainType
} from "./state/todolists-reducer";
import {
    addTaskTC,
    changeTaskStatusTC,
    changeTitleStatusTC,
    removeTaskTC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolist-api";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    console.log('App is called')

    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(store => store.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(store => store.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTS())
    }, [])


    const removeTask = useCallback((id: string, todolistId: string) => {
        const thunk = removeTaskTC(id, todolistId)
        dispatch(thunk)
    }, [])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(value, todolistId)
        dispatch(action)
    }, [])

    const addTasks = useCallback((title: string, todoListId: string) => {
        const thunk = addTaskTC(title, todoListId)
        dispatch(thunk)
    }, [])

    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        const thunk = changeTaskStatusTC(id, status, todolistId)
        dispatch(thunk)
    }, [])

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistTC(title)
        dispatch(action)
    }, [])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        const action = changeTitleStatusTC(id, newTitle, todolistId)
        dispatch(action)
    }, [])

    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistTC(todolistId)
        dispatch(action)
    }, [])

    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        const action = changeTodolistTitleTC(todolistId, newTitle)
        dispatch(action)
    }, [])

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
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTask = tasks[tl.id]
                            let tasksForTodolist = allTodolistTask

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

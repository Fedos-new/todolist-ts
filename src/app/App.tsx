import React from 'react';
import './App.css';

import {AppBar, IconButton, Toolbar, Typography, Button, Container, LinearProgress} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskType} from "../api/todolist-api";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {useSelector} from "react-redux";

import {AppRootState} from "./store";
import {RequestStatusType} from "./app-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const status = useSelector<AppRootState, RequestStatusType >(state => state.app.status)


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
            { status === 'loading' &&  <LinearProgress color="secondary" />}
            <Container fixed>
                <TodolistsList />
            </Container>
        </div>
    );
}



export default App;

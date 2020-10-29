import React from 'react';
import './App.css';

import {AppBar, IconButton, Toolbar, Typography, Button, Container} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskType} from "../api/todolist-api";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    console.log('App is called')



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
                <TodolistsList />
            </Container>
        </div>
    );
}



export default App;

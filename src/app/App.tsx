import React from 'react';
import './App.css';
import {AppBar, IconButton, Toolbar, Typography, Button, Container, LinearProgress} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {useSelector} from "react-redux";

import {AppRootState} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ ErrorSnackbar/ErrorSnackbar";



function App() {

    const status = useSelector<AppRootState, RequestStatusType >(state => state.app.status)


    return (
        <div className="App">
           <ErrorSnackbar/>
            <AppBar position="static" className='bar'>
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

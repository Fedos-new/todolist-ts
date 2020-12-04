import React, {useEffect} from 'react';
import './App.css';
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Button,
    Container,
    LinearProgress,
    CircularProgress
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Redirect, Route, Switch } from 'react-router-dom';
import { logoutTC } from '../features/Login/auth-reducer';


function App() {

    const status = useSelector<AppRootState, RequestStatusType >(state => state.app.status)
    const isInitialized = useSelector<AppRootState, boolean>(state => state.app.isInitialized )
    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(logoutTC())
    }
    
    useEffect(() => {
        dispatch(initializeAppTC())
    },[])

    
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

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

                    {isInitialized && <Button color="inherit" onClick={logOut}>Log out</Button>}
                </Toolbar>
            </AppBar>
            { status === 'loading' &&  <LinearProgress color="secondary" />}
            <Container fixed>
                <Switch><Route exact path={'/'} render={() => <TodolistsList/>}/>
                    <Route exact path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1>Page Not Found - Error 404</h1>}/>
                    <Redirect from={'/*'} to={'/404'}/>
                </Switch>
            </Container>
        </div>
    );
}

export default App;

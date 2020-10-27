import React, {useCallback, useReducer} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, IconButton, Toolbar, Typography, Button, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTitleStatusAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {TaskStatuses, TaskType, TodoTaskPriorities} from "./api/todolist-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer,[
        {id: todoListId1, title: "What to learn", filter: "all", addedDate: '',
            order: 0},
        {id: todoListId2, title: "What to buy", filter: "all", addedDate: '',
            order: 0}
    ])

    let [tasks,  dispatchToTasksReducer] = useReducer(tasksReducer ,{
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId:todoListId1,
                addedDate: '', deadline: '', description: '', startDate:'', order: 0, priority: TodoTaskPriorities.Hi},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId:todoListId1,
                addedDate: '', deadline: '', description: '', startDate:'', order: 0, priority: TodoTaskPriorities.Hi},
            {id: v1(), title: "React", status: TaskStatuses.Completed, todoListId:todoListId1,
                addedDate: '', deadline: '', description: '', startDate:'', order: 0, priority: TodoTaskPriorities.Hi},
            {id: v1(), title: "Rest API", status: TaskStatuses.Completed, todoListId:todoListId1,
                addedDate: '', deadline: '', description: '', startDate:'', order: 0, priority: TodoTaskPriorities.Hi},
            {id: v1(), title: "GraphQL", status: TaskStatuses.Completed, todoListId:todoListId1,
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


    const removeTask  = useCallback ((id: string, todolistId: string)=>  {
        const action = removeTaskAC(id, todolistId)
        dispatchToTasksReducer(action)
    }, [])

    const changeFilter = useCallback ((value: FilterValuesType, todolistId: string)=> {
        const action = changeTodolistFilterAC(value,todolistId)
        dispatchToTodolistsReducer(action)
    }, [])

    const addTasks = useCallback ((title: string, todolistId: string)=> {
        const action = addTaskAC(title, todolistId)
        dispatchToTasksReducer(action)
    }, [])

    const changeStatus = useCallback ((id: string, status: TaskStatuses, todolistId: string)=> {
        const action = changeTaskStatusAC(id, status, todolistId)
        dispatchToTasksReducer(action)
    }, [])

    const addTodolist = useCallback ((title: string)=> {
        const action = addTodolistAC(title)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }, [])

    const changeTaskTitle = useCallback ((id: string, newTitle: string, todolistId: string)=> {
        const action = changeTitleStatusAC(id, newTitle, todolistId)
        dispatchToTasksReducer(action)
    }, [])

    const removeTodolist = useCallback ((todolistId: string)=> {
        const action = removeTodolistAC(todolistId)
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action)
    }, [])

    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatchToTodolistsReducer(action)
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

export default AppWithReducers;

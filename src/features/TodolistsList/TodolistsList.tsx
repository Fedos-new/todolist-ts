import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistTitleTC,
    fetchTodolistsTS,
    FilterValuesType, removeTodolistTC,
    TodolistDomainType
} from "./todolists-reducer";
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import Todolist from "./Todolist/Todolist";
import {Redirect} from "react-router-dom";
import {useStyles} from "../../app/useStyles";


type TodolistsListsPropsType = {}

export const TodolistsList: React.FC<TodolistsListsPropsType> = (props) => {

    const classes = useStyles()
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(store => store.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(store => store.tasks)
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTS())
    }, [])

    const removeTask = useCallback((id: string, todolistId: string) => {
        const thunk = removeTaskTC(id, todolistId)
        dispatch(thunk)
    }, [])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC({filter: value, id: todolistId})
        dispatch(action)
    }, [])

    const addTasks = useCallback((title: string, todoListId: string) => {
        const thunk = addTaskTC(title, todoListId)
        dispatch(thunk)
    }, [])

    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        const thunk = updateTaskTC(id, {status}, todolistId)
        dispatch(thunk)
    }, [])

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistTC(title)
        dispatch(action)
    }, [])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        const action = updateTaskTC(id, {title: newTitle}, todolistId)
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
    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }
    return (
        <>
            <Grid  className={classes.gridAddForm} >
                <AddItemForm addItem={addTodolist} entityStatus={'idle'}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let allTodolistTask = tasks[tl.id]
                        return (
                            <Grid item key={tl.id}>
                                <Paper  className={classes.paperTodo}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        entityStatus={tl.entityStatus}
                                        tasks={allTodolistTask}
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
                            </Grid>)
                    })
                }
            </Grid>
        </>
    )
}

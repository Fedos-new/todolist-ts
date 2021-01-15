import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC,} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: Array<TodolistDomainType> = []

export const slice = createSlice({
    name: 'task',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: 'idle'})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ todolistId: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ filter: FilterValuesType, id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ todolistId: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.entityStatus
            state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                entityStatus: action.payload.entityStatus
            } : tl)
        },
    }
})

export const todolistsReducer = slice.reducer
export const {
    removeTodolistAC, addTodolistAC, changeTodolistTitleAC,
    changeTodolistFilterAC, changeTodolistEntityStatusAC, setTodolistsAC
} = slice.actions


//thunks
export const fetchTodolistsTS = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC({todolists: res}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })

    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTodolistEntityStatusAC({todolistId, entityStatus: 'loading'}))
        todolistAPI.deleteTodolist(todolistId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC({todolistId}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistAPI.createTodolist(title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC({todolist: res.data.data.item}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistAPI.updateTodolist(todolistId, title)
            .then(res => {
                dispatch(changeTodolistTitleAC({todolistId, title}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}


//types



export type FilterValuesType = "all" | "completed" | "active"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

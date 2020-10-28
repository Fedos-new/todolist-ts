import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export  type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export  type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}
export  type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistId: string
    title: string
}
export  type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
export  type SetTodolistActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}


type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType | SetTodolistActionType

export let todoListId1 = v1();
export let todoListId2 = v1();


const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: "all"}
            return [newTodolist, ...state,]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find(tl => tl.id === action.todolistId)
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => ({
                ...tl,
                filter: "all"
            }))
        }

        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, title: title}
}
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}


export const fetchTodolistsTS = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res))
            })
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolist(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })

    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolist(todolistId, title)
            .then(res => {
                dispatch(changeTodolistTitleAC(todolistId, title))
            })

    }
}

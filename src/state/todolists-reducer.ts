import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export  type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export  type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export  type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export  type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: newTodolistTitle, todolistId: v1()}
}
export const changeTodolistTitleAC = (todolistId2: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId2, title: newTodolistTitle}
}
export const changeTodolistFilterAC = (newFilter: FilterValuesType, todolistId2: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId2, filter: newFilter}
}


type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export let todoListId1 = v1();
export let todoListId2 = v1();


const initialState: Array<TodolistType>  = [
    {id: todoListId1, title: "Todolist 1", filter: "all"},
    {id: todoListId2, title: "Todolist 2", filter: "all"}
    ]


export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{id: action.todolistId, title: action.title, filter: "all"},
                ...state,]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find(tl => tl.id === action.id)
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
        default:
            return state

    }
}
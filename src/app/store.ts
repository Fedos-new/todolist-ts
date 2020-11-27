import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer

})


export type AppRootState = ReturnType<typeof rootReducer> //автомачически подтягивает типы из combineReducers
export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store
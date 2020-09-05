import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";


const rootReducer = combineReducers({
    todolist: todolistsReducer,
    tasks: tasksReducer
})
export type AppRootState = ReturnType<typeof rootReducer> //автомачически подтягивает типы из combineReducers

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store
import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer

})



export type AppRootState = ReturnType<typeof rootReducer> //автомачически подтягивает типы из combineReducers

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store
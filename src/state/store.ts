import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer

})



export type AppRootState = ReturnType<typeof rootReducer> //автомачически подтягивает типы из combineReducers

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store
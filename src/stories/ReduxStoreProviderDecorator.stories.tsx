import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../features/TodolistsList/tasks-reducer'
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer'
import {v1} from 'uuid'
import {AppRootState} from '../app/store'
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '',
            order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '',
            order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.New,todoListId:"todolistId1",
                addedDate: '', deadline: '', description: '', startDate:'', order: 0, priority: TaskPriorities.Hi},
            {id: v1(), title: "JS",status: TaskStatuses.New,todoListId:"todolistId1",
                addedDate: '', deadline: '', description: '', startDate:'', order: 0, priority: TaskPriorities.Hi},
            {id: v1(), title: "JS"}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.New,todoListId:"todolistId2",
                addedDate: '', deadline: '', description: '', startDate:'', order: 0, priority: TaskPriorities.Hi},
            {id: v1(), title: "React Book", status: TaskStatuses.New,todoListId:"todolistId2",
                addedDate: '', deadline: '', description: '', startDate:'', order: 0, priority: TaskPriorities.Hi},
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>{storyFn()} </Provider>)

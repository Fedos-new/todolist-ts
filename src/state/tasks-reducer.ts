import {TasksStateType} from "../App";
import {v1} from "uuid";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string,
    isDone: boolean,
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    title: string,
    todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const task = state[action.todolistId]
            let filteredTasks = task.filter(t => t.id != action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const task = stateCopy[action.todolistId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            let newTasks = [newTask, ...task]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.isDone;
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            let tasks =  stateCopy[action.todolistId]
            let task = tasks.find(t=> t.id === action.taskId)
            if(task) {
                task.title = action.title
            }
            return stateCopy
        }

        default:
            throw  new Error("I don't understand this action");
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}
export const changeTitleStatusAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}
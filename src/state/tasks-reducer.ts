import {TasksStateType} from "../App";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistActionType,
    todoListId1,
    todoListId2
} from "./todolists-reducer";
import {tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootState} from "./store";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status: TaskStatuses
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}
export type SetTaskstActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}


const initialState: TasksStateType = {
    [todoListId1]: [],
    [todoListId2]: []
}

type ActionsType = RemoveTaskActionType
    | AddTaskActionType | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType | AddTodolistActionType
    | RemoveTodolistActionType | SetTodolistActionType
    | SetTaskstActionType


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const task = state[action.todolistId]
            let filteredTasks = task.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = action.task
            const tasks = stateCopy[newTask.todoListId]
            let newTasks = [newTask, ...tasks]
            stateCopy[newTask.todoListId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, status: action.status}
                    : t)

            return ({...state})
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t)

            return ({...state})
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolist.id] = [];
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, status, todolistId}
}
export const changeTitleStatusAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTaskstActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
}

export const removeTaskTC = (taskId: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.deleteTask(todoListId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todoListId))
            })
    }
}

export const addTaskTC = (title: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.createTask(todoListId, title)
            .then(res => {
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
            })
    }
}

export const changeTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {

        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)

        if (!task) {
            //throw  new Error('task not found in the state')
            console.warn('task not found in the state')
            return
        }
        const model: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            startDate: task.startDate,
            status: status,
            title: task.title,
            priority: task.priority
        }
        tasksAPI.updateTask(todolistId, taskId, model)
            .then(res => {
                dispatch(changeTaskStatusAC(taskId, status, todolistId))
            })
    }
}

export const changeTitleStatusTC = (taskId: string, title: string, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {

        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)

        if (!task) {
            //throw  new Error('task not found in the state')
            console.warn('task not found in the state')
            return
        }
        const model: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            startDate: task.startDate,
            status: task.status,
            title: title,
            priority: task.priority
        }
        tasksAPI.updateTask(todolistId, taskId, model)
            .then(res => {
                dispatch(changeTitleStatusAC(taskId, title, todolistId))
            })

    }
}
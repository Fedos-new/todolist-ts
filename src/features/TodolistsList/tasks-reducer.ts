import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistActionType
} from "./todolists-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootState} from "../../app/store";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]:state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {...state,[action.todolistId]:state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t) }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: [] }
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

//actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', taskId, model, todolistId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            const action = setTasksAC(tasks, todolistId)
            dispatch(action)
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const removeTaskTC = (taskId: string, todoListId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.deleteTask(todoListId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(taskId, todoListId))
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const addTaskTC = (title: string, todoListId: string) => (dispatch: Dispatch<ActionsType>) => {

    dispatch(setAppStatusAC('loading'))
    tasksAPI.createTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootState) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw  new Error('task not found in the state')
            console.warn('task not found in the state')
            return
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        dispatch(setAppStatusAC('loading'))
        tasksAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {

                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(taskId, domainModel, todolistId))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }


//types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | SetAppStatusActionType
    | SetAppErrorActionType

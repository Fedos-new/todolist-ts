import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "api-key": '3c9a379c-5299-4637-abd2-f49a30f8dddb'
    }
})

//api
export default {
    title: 'API'
}

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title: title})
    },
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists/').then(res => res.data)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists/', {title: title})
    },
}

export const tasksAPI = {
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<CreateDeleteUpdateTask<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskType>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CreateDeleteUpdateTask<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CreateDeleteUpdateTask<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: title})
    }
}

export const authAPI = {
    login(data:LoginParamsType) {
        return instance.post<ResponseType<MeAuthResponseType>>(`auth/login`, data)
    },
    me(){
        return instance.get<ResponseType<{ }>>(`auth/me`)
    },
    logout() {
        return instance.delete<ResponseType<{}>>(`auth/login`)
    }
}

//types

export type MeAuthResponseType ={
    id:number
    email: string
    login: string
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TodoTaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTaskType = {
    items: Array<TaskType>
    totalCount: string
    error: null | string
}
type CreateDeleteUpdateTask<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
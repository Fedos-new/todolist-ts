import axios from 'axios'

export default {
    title: 'API'
}

export const settings = {
    withCredentials: true,
    headers: {
        "api-key": '3c9a379c-5299-4637-abd2-f49a30f8dddb'
    }
}

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    ...settings
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number

}

export type ResponseTodolistType<D> = {
    resultCode: number
    messages: Array<string>
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


export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseTodolistType<{}>>(`${todolistId}`, {title: title})
    },
    getTodolists() {
        return instance.get<TodolistType[]>('').then(res => res.data)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseTodolistType<{}>>(`${todolistId}`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseTodolistType<{ item: TodolistType }>>('', {title: title})
    }
}

export const tasksAPI = {
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<CreateDeleteUpdateTask<{ item: TaskType }>>(`${todolistId}/tasks/${taskId}`, model)
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskType>(`${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CreateDeleteUpdateTask<{}>>(`${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CreateDeleteUpdateTask<{ item: TaskType }>>(`${todolistId}/tasks`, {title: title})
    }
}

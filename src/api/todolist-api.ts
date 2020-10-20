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

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseTodolistType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
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


export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseTodolistType<{}>>(`${todolistId}`, {title: title})
    },
    getTodolists() {
        return instance.get<ResponseTodolistType<{}>>('')
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseTodolistType<{}>>(`${todolistId}`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseTodolistType<{ item: TodolistType }>>('', {title: title})
    }
}

export const tasksAPI = {
    updateTask(todolistId: string, title: string, taskId: string) {
        return instance.put<CreateDeleteUpdateTask<{ item: TaskType }>>(`${todolistId}/tasks/${taskId}`, {title: title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskType>(`${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CreateDeleteUpdateTask<{}>>(`${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CreateDeleteUpdateTask<{}>>(`${todolistId}/tasks`, {title: title})
    }
}

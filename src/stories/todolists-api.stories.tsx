import React, {useEffect, useState} from 'react'
import {tasksAPI, todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>

}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    let title = 'newTitleTodolist'
    useEffect(() => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    let todolistId = '1221bf02-7bc7-4f48-9a2f-2db40260eb13'
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    let todolistId = '0238b3f2-1e1f-46cd-8aa9-c5da5457b7bc'
    let title = 'XxXxXxXxXFSDg'
    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    let todolistId = '092fba1e-f437-4780-9d31-ec021d8d707f'
    const getTasks = () => {
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <>
        <div> {JSON.stringify(state)}</div>
        <button onClick={getTasks}>Get Tasks</button>
    </>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>('')
    let todolistId = '092fba1e-f437-4780-9d31-ec021d8d707f'
    const createTask = () => {
        tasksAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <>
        <div> {JSON.stringify(state)}</div>
        <input type="text" placeholder={'title task'} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <button onClick={createTask}>create task</button>
    </>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const deleteTask = () => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <>
        <div> {JSON.stringify(state)}</div>
        <input type="text" placeholder={'todolistId'} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input type="text" placeholder={'taskId'} onChange={(e) => {
            setTaskId(e.currentTarget.value)
        }}/>

        <button onClick={deleteTask}>Delete task</button>
    </>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')


    const updateTask = () => {
        // @ts-ignore
        tasksAPI.updateTask(todolistId, title, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <>
        <div> {JSON.stringify(state)}</div>
        <input type="text" placeholder={'todolistId'} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input type="text" placeholder={'taskId'} onChange={(e) => {
            setTaskId(e.currentTarget.value)
        }}/>
        <input type="text" placeholder={'New Title Task'} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <button onClick={updateTask}>Update task</button>
    </>
}


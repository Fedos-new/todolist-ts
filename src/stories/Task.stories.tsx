import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "../features/TodolistsList/Todolist/Task/Task";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

export default {
    title: 'Task Component',
    component: Task
}


const changeTaskStatusCallback = action("Status changed")
const changeTaskTitleCallback = action("Title changed")
const removeTaskCallback = action("Task remove")


export const TaskBaseExample = () => {
    return <>
        <Task
            task={{
                id: '1', status: TaskStatuses.Completed, title: 'CSS', todoListId:'todolistId1',
                addedDate: '', deadline: '', description: '', startDate: '', order: 0, priority: TaskPriorities.Hi
            }}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todolistId={'todolistId1'}
        />
        <Task
            task={{
                id: '2', status: TaskStatuses.New, title: 'JS', todoListId:'todolistId2',
                addedDate: '', deadline: '', description: '', startDate: '', order: 0, priority: TaskPriorities.Hi
            }}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todolistId={'todolistId2'}
        />
    </>
}

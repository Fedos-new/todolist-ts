import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";
import {TaskStatuses, TodoTaskPriorities} from "../api/todolist-api";

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
                addedDate: '', deadline: '', description: '', startDate: '', order: 0, priority: TodoTaskPriorities.Hi
            }}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todolistId={'todolistId1'}
        />
        <Task
            task={{
                id: '2', status: TaskStatuses.New, title: 'JS', todoListId:'todolistId2',
                addedDate: '', deadline: '', description: '', startDate: '', order: 0, priority: TodoTaskPriorities.Hi
            }}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todolistId={'todolistId2'}
        />
    </>
}

import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./components/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TasksType} from "./Todolist";

type TasksPropsType = {
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    task: TasksType
    todolistId: string
}
export const Task = React.memo((props: TasksPropsType) => {

    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }
    const changeTaskTitle = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todolistId)
    }, [props.changeTaskTitle,props.task.id, props.todolistId ])
    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.task.isDone}
            onChange={onChangeHandler}/>

        <EditableSpan title={props.task.title} saveNewTitle={changeTaskTitle}/>
        {/*<span>{t.title}</span>*/}
        <IconButton onClick={onClickHandler} color={"primary"}>
            <Delete/>
        </IconButton>
    </div>
})
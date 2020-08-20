import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterValuesType} from "./App";
import {EditableSpan} from "./components/EditableSpan";
import {Button, IconButton, Checkbox, TextField} from "@material-ui/core";
import {AddBoxOutlined, Delete} from "@material-ui/icons";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTasks: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: string
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void

}

function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTasks = () => {
        if (title.trim() !== "") {
            props.addTasks(title.trim(), props.id)
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTasks();
        }
    }


    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    const onClickRemoveTodolist = () => props.removeTodolist(props.id)

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    return (
        <div className="App">
            <div>
                <h3><EditableSpan title={props.title} saveNewTitle={changeTodolistTitle}/>
                    <IconButton onClick={onClickRemoveTodolist}>
                        <Delete/>
                    </IconButton>
                </h3>
                <div>
                    <TextField value={title}
                               variant={"outlined"}
                               onChange={onChangeHandler}
                               onKeyPress={onKeyPressHandler}
                               error={!!error}
                               helperText={error}
                    />
                    <Button onClick={addTasks}  color={"primary"}>
                        <AddBoxOutlined />
                    </Button>
                </div>
                <ul>
                    {
                        props.tasks.map(t => {
                            const onClickHandler = () => props.removeTask(t.id, props.id)
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                            }
                            const changeTaskTitle = (newTitle: string) => {
                                props.changeTaskTitle(t.id, newTitle, props.id)
                            }
                            return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                                <Checkbox
                                    checked={t.isDone}
                                    onChange={onChangeHandler}/>

                                <EditableSpan title={t.title} saveNewTitle={changeTaskTitle}/>
                                {/*<span>{t.title}</span>*/}
                                <IconButton onClick={onClickHandler} color={"primary"}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        })
                    }

                </ul>
                <div>
                    <Button variant={props.filter === "all" ? "contained" : "text"}
                            onClick={onAllClickHandler}>All
                    </Button>
                    <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"}
                            onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"}
                            onClick={onCompletedClickHandler}>Completed
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Todolist;

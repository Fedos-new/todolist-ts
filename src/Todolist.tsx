import React, {ChangeEvent, useCallback} from 'react';
import './App.css';
import {FilterValuesType} from "./App";
import {EditableSpan} from "./components/EditableSpan";
import {Button, IconButton, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {AddItemForm} from "./components/AddItemForm";

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

const Todolist = React.memo(function (props: PropsType) {


    const addTasks = useCallback((title: string) => {
        props.addTasks(title, props.id)
    }, [])

    const onClickRemoveTodolist = () => props.removeTodolist(props.id)

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }


    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    return (
        <div className="App">
            <div>
                <h3><EditableSpan title={props.title} saveNewTitle={changeTodolistTitle}/>
                    <IconButton onClick={onClickRemoveTodolist}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTasks}/>
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
})

export default Todolist;

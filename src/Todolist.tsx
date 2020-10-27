import React, {useCallback} from 'react';
import './App.css';
 import {EditableSpan} from "./components/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {AddItemForm} from "./components/AddItemForm";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValuesType} from "./state/todolists-reducer";


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTasks: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void

}

const Todolist = React.memo(function (props: PropsType) {
    console.log('Todolist is called')

    const addTasks = useCallback((title: string) => {
        props.addTasks(title, props.id)
    }, [props.addTasks, props.id])

    const onClickRemoveTodolist = useCallback(() => props.removeTodolist(props.id), [props.id , props.removeTodolist])

    const changeTodolistTitle = useCallback( (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.id, props.changeTodolistTitle ])


    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter,props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter,props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter,props.id])

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed );
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
                        tasksForTodolist.map(t => <Task
                            task={t}
                            changeTaskStatus={props.changeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle}
                            removeTask={props.removeTask}
                            todolistId={props.id}
                            key={t.id}
                        />)
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


import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import '../App.css';
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";
import {PostAddOutlined} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addItem()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <div>
            <h3>Add Todolist</h3>
            <TextField value={title}
                       variant={"outlined"}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
            />

            <Button onClick={addItem}  color={"default"}>
                <PostAddOutlined color={"primary"}/>
            </Button>

        </div>
    )

}
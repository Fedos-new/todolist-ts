import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import '../../app/App.css';
import {IconButton, TextField} from "@material-ui/core";
import {PostAddOutlined} from "@material-ui/icons";
import {RequestStatusType} from "../../app/app-reducer";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    entityStatus: RequestStatusType
}

export const AddItemForm = React.memo ((props: AddItemFormPropsType) => {
    console.log('AddItemForm called')

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
        if(error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addItem()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <div>
            <TextField value={title}
                       variant={"outlined"}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
                       disabled={props.entityStatus === 'loading'}
            />

            <IconButton onClick={addItem}  color={"primary"} disabled={props.entityStatus === 'loading'}>
                <PostAddOutlined />
            </IconButton>

        </div>
    )

})
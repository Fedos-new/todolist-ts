import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import '../App.css';

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

            <input value={title}
                   className={error ? "error" : ""}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={addItem}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )

}
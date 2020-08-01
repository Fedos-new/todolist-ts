import React, {ChangeEvent, useState} from "react";

type PropsType = {
    title: string
    saveNewTitle: (newTitle: string) => void
}

export function EditableSpan(props: PropsType) {

    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState(props.title)

    const activeEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const deActiveEditMode = () => {
        setEditMode(false)
        props.saveNewTitle(title)
    }


    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }

    return editMode
        ? <input value={title}
                 onBlur={deActiveEditMode}
                 autoFocus={true}
                 onChange={onChangeInput}/>
        : <span onDoubleClick={activeEditMode}>{props.title}</span>
}
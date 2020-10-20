import React from "react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../components/EditableSpan";

export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}


const changeTCallback = action("Title changed")


export  const EditableSpanBaseExample = () => {
    return <EditableSpan title={'start title'} saveNewTitle={changeTCallback}  />
}

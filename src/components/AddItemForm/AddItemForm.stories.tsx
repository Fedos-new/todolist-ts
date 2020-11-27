import {AddItemForm} from "./AddItemForm";
import React from "react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItemForm Component',
    component: AddItemForm
}


const callback = action("Button 'add' was inside the from")

export  const AddItemFormBaseExamle = (props: any) => {
    return <AddItemForm addItem={callback} entityStatus={'idle'}/>
}

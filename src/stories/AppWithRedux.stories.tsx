import React from "react";
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator.stories";

export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}



export  const AppWithReduxBaseExample = () => {
    return  <AppWithRedux />
}

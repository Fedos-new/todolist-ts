export type RequestStatusType = 'idle'|'loading'|'succeeced'|'faile'

type InitialStateType = {
    status: RequestStatusType
}

const initialState: InitialStateType = {
    status: 'loading',
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}



export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>



type ActionsType = any
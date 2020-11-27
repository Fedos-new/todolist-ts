export type RequestStatusType = 'idle'|'loading'|'succeeced'|'failed'
export type RequestErrorType = string | null

type InitialStateType = {
    status: RequestStatusType
    error: RequestErrorType
}

const initialState: InitialStateType = {
    status: 'loading',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}



export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

export const setAppErrorAC = (error: RequestErrorType) => ({type: 'APP/SET-ERROR', error} as const)
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>


type ActionsType = any
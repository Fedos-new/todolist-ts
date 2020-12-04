import {authAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {handleServerNetworkError} from "../utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestErrorType = string | null

type InitialStateType = {
    status: RequestStatusType
    error: RequestErrorType
    isInitialized: boolean
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}


export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

export const setAppErrorAC = (error: RequestErrorType) => ({type: 'APP/SET-ERROR', error} as const)
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

export const setAppInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZED', isInitialized} as const)
export type SetAppInitializedActionType = ReturnType<typeof setAppInitializedAC>

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
            } else {
            }
            dispatch(setAppInitializedAC(true))
        })
        .catch((error) => {
            dispatch(setAppInitializedAC(true))
            handleServerNetworkError(error, dispatch)
        })
}


type ActionsType = any
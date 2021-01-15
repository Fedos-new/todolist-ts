import {authAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: RequestErrorType }>) {
            state.error = action.payload.error
        },
        setAppInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        },
    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC, setAppInitializedAC} = slice.actions


export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}));
            } else {
            }
            dispatch(setAppInitializedAC({isInitialized: true}))
        })
        .catch((error) => {
            dispatch(setAppInitializedAC({isInitialized: true}))
            handleServerNetworkError(error, dispatch)
        })
}


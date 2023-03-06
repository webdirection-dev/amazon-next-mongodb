import { combineReducers } from '@reduxjs/toolkit'
import {cartReducer} from "./cart-slice"
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {configureStore} from "@reduxjs/toolkit"
import axios, {AxiosStatic,  AxiosInstance} from 'axios'
export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const rootReducer = combineReducers({
    cartReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        thunk: {
            extraArgument: {
                client: axiosInstance,
            },
        },
    }),
    devTools: true,
})

export type DetailsExtra = {client: AxiosInstance}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

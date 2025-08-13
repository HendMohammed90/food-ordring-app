'use client'

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { Environments } from "@/constants/enums";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    devTools: process.env.NODE_ENV !== Environments.DEV,
});

// Types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

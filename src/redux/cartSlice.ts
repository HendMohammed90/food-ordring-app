'use client'

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Extra, Size } from "../../prisma/generated/prisma";

export type CartItem = {
    id: string;
    name: string;
    basePrice: number;
    image: string;
    quantity?: number;
    size?: Size;
    extraIngredients?: Extra[];
};

type CartState = {
    items: CartItem[];
};

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existing = state.items.find((i) => i.id === action.payload.id);
            if (existing) {
                // existing.quantity = (existing.quantity ?? 0) + 1;
                existing.quantity = (existing.quantity ?? 0) + (action.payload.quantity ?? 1);
                existing.size = action.payload.size;
                existing.extraIngredients = action.payload.extraIngredients;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<{id:string}>) => {
            // state.items = state.items.filter((i) => i.id !== action.payload);
            const existing = state.items.find((i) => i.id === action.payload.id);
            if (existing) {
                existing.quantity = (existing.quantity ?? 0) - 1;
                if (existing.quantity === 0) {
                    state.items = state.items.filter((i) => i.id !== action.payload.id);
                }
            }else{
                state.items = state.items.filter((i) => i.id !== action.payload.id);
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
export const selectCartItems = (state: RootState) => state.cart.items;
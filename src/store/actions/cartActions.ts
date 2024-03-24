import { createAsyncThunk } from "@reduxjs/toolkit";
import { Item } from "../../types/products";
import { Cart } from "../../types/cart";
import {ProductsState} from "../reducers/productsSlice";

export type AddToCartPayload = {
    productId: number;
    cart: Cart;
};

export const addToCart = createAsyncThunk<AddToCartPayload, { productId: number; quantity: number },
    { rejectValue: string | null }>(
    'cartSlice/addToCart',
    async ({ productId, quantity }, thunkAPI) => {
        if (!thunkAPI || !thunkAPI.getState) {
            throw new Error('Invalid thunkAPI or getState');
        }

        const state = thunkAPI.getState() as { products: ProductsState } | undefined;
        if (!state || !state.products) {
            throw new Error('Invalid state or products state');
        }

        const productToUpdate = state.products.products.find((product: Item) => product.id === productId);

        if (!productToUpdate) {
            throw new Error('Product not found');
        }

        try {
            const response = await fetch('/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, quantity }),
            });
            if (!response.ok) {
                thunkAPI.rejectWithValue('Failed to add product to cart');
            }
            const cart = await response.json();
            return { productId, cart };
        } catch (error) {
            return thunkAPI.rejectWithValue(error as string)
        }
    }
);

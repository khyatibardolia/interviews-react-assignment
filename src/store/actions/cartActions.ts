import { createAsyncThunk } from "@reduxjs/toolkit";
import { Item } from "../../types/products";
import { Cart } from "../../types/cart";
import {AsyncThunkConfig, GetThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";

export type AddToCartPayload = {
    productId: number;
    cart: Cart;
};

export const addToCart = createAsyncThunk<AddToCartPayload, { productId: number; quantity: number }>(
    'cartSlice/addToCart',
    async ({ productId, quantity }, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
        const { products: { products } } = thunkAPI.getState();
        const productToUpdate = products.find((product: Item) => product.id === productId);

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
                throw new Error('Failed to add product to cart');
            }
            const cart = await response.json();
            return { productId, cart };
        } catch (error) {
            throw new Error('Failed to fetch cart items');
        }
    }
);

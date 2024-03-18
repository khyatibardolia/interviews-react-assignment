import {createAsyncThunk} from '@reduxjs/toolkit';
import {AsyncThunkConfig, GetThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {Product} from "../../types/products";

export const fetchProducts = createAsyncThunk<Product[]>('productsSlice/fetchProducts',
    async (_, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
        try {
            const response = await fetch(`/products?page=${thunkAPI.getState().products.page}&limit=10`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            return data.products;
        } catch (error) {
            throw new Error('Failed to fetch products');
        }
    });

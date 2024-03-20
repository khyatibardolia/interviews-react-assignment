import {createAsyncThunk} from '@reduxjs/toolkit';
import {AsyncThunkConfig, GetThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {Product} from "../../types/products";

export const fetchProducts = createAsyncThunk<Product[]>('productsSlice/fetchProducts',
    async (_, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
        const { products: { page, searchQuery, categoryQuery } } = thunkAPI.getState();
        try {
            const response = await fetch(`/products?page=${page}&limit=10&q=${searchQuery}&category=${categoryQuery}`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Failed to fetch products');
        }
    }
);

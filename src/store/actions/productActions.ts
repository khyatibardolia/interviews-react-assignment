import {createAsyncThunk} from '@reduxjs/toolkit';
import {Product} from "../../types/products";
import {ProductsState} from "../reducers/productsSlice";

export const fetchProducts = createAsyncThunk<Product, void, { rejectValue: string | null }>('productsSlice/fetchProducts',
    async (_, thunkAPI) => {
        if (!thunkAPI || !thunkAPI.getState) {
            throw new Error('Invalid thunkAPI or getState');
        }

        const state = thunkAPI.getState() as { products: ProductsState } | undefined;
        if (!state || !state.products) {
            throw new Error('Invalid state or products state');
        }

        const { page, searchQuery, categoryQuery } = state.products;
        try {
            const response = await fetch(`/products?page=${page}&limit=10&q=${searchQuery}&category=${categoryQuery}`);
            if (!response.ok) {
                thunkAPI.rejectWithValue('Failed to fetch products');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error as string);
        }
    }
);

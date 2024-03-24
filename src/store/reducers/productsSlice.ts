import {ActionReducerMapBuilder, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Item, Product} from '../../types/products';
import {fetchProducts} from "../actions/productActions";

export interface ProductsState {
    products: Item[];
    loading: boolean;
    error: string | null;
    page: number;
    searchQuery: string;
    hasMore: boolean;
    categoryQuery: string;
}

const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null,
    page: 0,
    searchQuery: '',
    hasMore: false,
    categoryQuery: '',
};

const PAGE_LIMIT: number = 10;

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        incrementPage: (state) => {
            state.page += 1;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            state.page = 0;
        },
        setCategoryQuery: (state, action: PayloadAction<string>) => {
            state.categoryQuery = action.payload;
            state.page = 0;
            state.products = [];
        },
        clearProducts: (state) => {
            state.products = [];
            state.page = 0;
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<ProductsState>) => {
        builder.addCase(fetchProducts.pending, (state: ProductsState) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchProducts.fulfilled, (state: ProductsState, action: PayloadAction<Product>) => {
            state.loading = false;
            const {hasMore, products, total} = action.payload;
            state.hasMore = hasMore;

            if (total <= PAGE_LIMIT) {
                // Update products when there are no more pages (search or initial load)
                state.products = products;
            } else {
                const newData = products.filter((product: Item) => !state.products.find((p: Item) => p.id === product.id));
                // Append new products when there are more pages
                state.products = [...state.products, ...newData];
            }
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? 'Something went wrong';
        });
    },
});

export const { incrementPage, setSearchQuery, clearProducts, setCategoryQuery } = productsSlice.actions;
export default productsSlice.reducer;

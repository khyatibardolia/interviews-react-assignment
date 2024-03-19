import {ActionReducerMapBuilder, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../../types/products';
import {fetchProducts} from "../actions/productActions";

interface ProductsState {
    products: Product[];
    loading: boolean;
    error: string | null;
    page: number;
}

const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null,
    page: 0,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        incrementPage: (state) => {
            state.page += 1;
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<ProductsState>) => {
        builder.addCase(fetchProducts.pending, (state: ProductsState) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchProducts.fulfilled, (state: ProductsState, action: PayloadAction<Product[]>) => {
            state.loading = false;
            const uniqueProducts: Product[] = action.payload.filter(
                (product: Product) => !state.products.some((p: Product) => p.id === product.id)
            );
            state.products.push(...uniqueProducts);
        })
        builder.addCase(fetchProducts.rejected, (state: ProductsState, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload || 'Something went wrong';
        })
    },
});

export const { incrementPage } = productsSlice.actions;
export default productsSlice.reducer;

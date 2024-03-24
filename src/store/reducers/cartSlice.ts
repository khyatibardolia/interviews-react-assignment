import {ActionReducerMapBuilder, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {addToCart, AddToCartPayload} from '../actions/cartActions';
import {Cart} from "../../types/cart";

interface CartState {
    cart: Cart;
    loading: Record<number, boolean>;
    error: string | null;
}

export const initialState: CartState = {
    cart: {
        items: [],
        totalPrice: 0,
        totalItems: 0,
    },
    loading: {},
    error: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        dummyReducer() {}
    },
    extraReducers: (builder: ActionReducerMapBuilder<CartState>) => {
        builder
            .addCase(addToCart.pending, (state: CartState, action) => {
                const productId = action.meta.arg.productId;
                state.loading[productId] = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state: CartState, action: PayloadAction<AddToCartPayload>) => {
                const { productId, cart } = action.payload;
                state.cart = cart;
                state.loading[productId] = false;
            })
            .addCase(addToCart.rejected, (state: CartState, action) => {
                const productId = action.meta.arg.productId;
                state.loading[productId] = false;
                state.error = action.payload ? action.payload.toString() : 'Failed to add product to cart';
            });
    },
});

export default cartSlice.reducer;

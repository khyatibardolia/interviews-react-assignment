import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import checkoutReducer from './checkoutSlice';

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    checkout: checkoutReducer
});

export default rootReducer;

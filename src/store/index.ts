import {combineReducers, configureStore} from '@reduxjs/toolkit';
import productsReducer from './reducers/productsSlice';
import cartReducer from './reducers/cartSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"; // Import your products reducer

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Writing this here to prevent defining the types in every file
export const useAppDispatch = () => useDispatch<AppDispatch>()

// Used to get the data from the store in the component
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


import {Item} from "./products";

export interface Cart {
    items: CartItem[];
    totalPrice: number;
    totalItems: number;
}

export interface CartItem {
    product: Item;
    quantity: number;
}
import {Item} from "./products";

export interface Cart {
    items: Item[];
    totalPrice: number;
    totalItems: number;
}
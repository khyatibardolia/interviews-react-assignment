export interface Product {
    hasMore: boolean;
    products: Item[];
    total: number;
}

export interface Item {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    category: string;
}
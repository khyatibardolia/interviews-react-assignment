import { RootState } from '../store';

export const mockedProducts = [
    {
        id: 0,
        name: 'Apples',
        imageUrl: 'https://via.placeholder.com/150?text=Product+0',
        price: 28.53,
        category: 'Fruits',
    },
    {
        id: 1,
        name: 'Oranges',
        imageUrl: 'https://via.placeholder.com/150?text=Product+0',
        price: 28.55,
        category: 'Fruits',
    }
]

export const initialState: RootState = {
    products: {
        products: mockedProducts,
        loading: false,
        error: null,
        page: 0,
        searchQuery: '',
        hasMore: true,
        categoryQuery: ''
    },
    cart: {
        cart: {
            items: [],
            totalPrice: 0,
            totalItems: 0
        },
        loading: {},
        error: null
    }
};
import { fetchProducts } from '../productActions'; // Adjust the import path based on your project structure
import productsReducer from '../../reducers/productsSlice'; // Adjust the import path based on your project structure

// Mock async fetchProducts API call
jest.mock('../productActions', () => ({
    fetchProducts: jest.fn(),
}));

describe('Product Actions and Reducer', () => {
    let state = productsReducer.state;

    beforeEach(() => {
        state = productsReducer.state;
    });

    it('should fetch products successfully', async () => {
        const mockProducts = [
            { id: 1, name: 'Product 1' },
            { id: 2, name: 'Product 2' },
        ];
        const mockPayload = { products: mockProducts, hasMore: true, total: 20 };

        fetchProducts.mockReturnValueOnce(mockPayload);

        const action = await productsReducer.actions.fetchProducts();
        const newState = productsReducer.reducer(state, action);

        expect(newState.products).toEqual(mockProducts);
        expect(newState.hasMore).toBe(true);
        expect(newState.loading).toBe(false);
        expect(newState.error).toBeNull();
    });
});

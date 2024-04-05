import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import productsReducer, { ProductsState } from '../../reducers/productsSlice';
import { mockedProducts } from '../../../mocks/testUtils';
import * as productActionsModule from '../productActions';
import {fetchProducts} from "../productActions";

// Mock async fetchProducts API call
jest.mock('../productActions', () => ({
    ...jest.requireActual('../productActions'),
    fetchProducts: jest.fn(),
}));

describe('Product Actions and Reducer', () => {
    let store: EnhancedStore<{ products: ProductsState }>;

    beforeEach(() => {
        store = configureStore({ reducer: { products: productsReducer } });
    });

    it('should fetch products successfully', async () => {
        const mockPayload = { products: mockedProducts, hasMore: true, total: 2 };

        (productActionsModule.fetchProducts as any as jest.Mock).mockResolvedValueOnce(mockPayload);

        await fetchProducts();

        const newState = store.getState().products;

        expect(newState.products).toEqual(mockedProducts);
        expect(newState.hasMore).toBe(true);
        expect(newState.loading).toBe(false);
        expect(newState.error).toBeNull();
    });
});

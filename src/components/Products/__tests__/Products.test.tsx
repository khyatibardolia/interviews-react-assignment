import Products from '../Products';
import {waitFor, screen} from "@testing-library/react";
import {initialState} from "../../../mocks/testUtils";
import {renderComponentWithProvider} from "../../../utils/renderComponentWithProvider";

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

jest.mock('../../../store', () => ({
    useAppDispatch: jest.fn(() => jest.fn()),
    useAppSelector: jest.fn().mockReturnValue({
        products: {
            products: [
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
            ],
            loading: false,
            page: 0,
            hasMore: false,
            searchQuery: '',
            categoryQuery: ''
        }
    })
}));

describe('Products', () => {

    it.skip('renders ProductCard for each product', async () => {
        renderComponentWithProvider(<Products />)
        await waitFor(async () => {
            expect(await screen.getAllByTestId('product-card').length).toBe(2); // Assuming there are 2 products in the mocked data
        });
    });

    it.skip('displays no products found when there are no products', async () => {
        const state = {
            products: {
                products: [], // Empty products array
                loading: false,
                page: 0,
                hasMore: false,
                searchQuery: '',
                categoryQuery: '',
                error: null
            },
            cart: {
                ...initialState.cart
            }
        };
        renderComponentWithProvider(<Products />, state)

        await waitFor(async () => {
            expect(await screen.getByText('No Products Found!')).toBeInTheDocument();
        });
    });
});

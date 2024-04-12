import {fireEvent, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchAppBar from "../SearchAppBar";
import {renderComponentWithProvider} from "../../../utils/renderComponentWithProvider";
import {initialState} from "../../../mocks/testUtils";
import {fetchProducts} from "../../../store/actions/productActions";

// Mock the modules used in the component
jest.mock('../../../store/actions/productActions', () => ({
    fetchProducts: jest.fn(),
    clearProducts: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
    useLocation: jest.fn(() => ({
        pathname: '/mock-path',
    })),
}));

jest.mock('../../../store', () => ({
    useAppDispatch: jest.fn(() => jest.fn()),
    useAppSelector: jest.fn().mockReturnValue({
        products: {
            searchQuery: 'mockedSearchQuery'
        },
        cart: {
            items: [],
            totalPrice: 0,
            totalItems: 0,
        },
    }),
}));

describe('SearchAppBar Component Tests', () => {

    it('renders SearchAppBar correctly', () => {
        renderComponentWithProvider(<SearchAppBar />, {
            products: {
                ...initialState.products,
                searchQuery: '',
            },
            cart: {
             ...initialState.cart
            },
            checkout: {
                ...initialState.checkout
            }
        })
        expect(screen.getByText('FreshCart Market')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument();
        expect(screen.getByText('$ 0.00')).toBeInTheDocument();
    });

    it.skip('handles search input change', () => {
        renderComponentWithProvider(<SearchAppBar />)

        // Simulate typing into the search input
        const searchInput = screen.getByPlaceholderText('Search…');
        fireEvent.change(searchInput, { target: { value: 'apple' } });

        // Using waitFor to account for debounced change handler
        waitFor(() => expect(fetchProducts).toHaveBeenCalledWith('apple'));
    });

    it.skip('does not display badge when quantity is 0', () => {
        renderComponentWithProvider(<SearchAppBar />)
        expect(screen.queryByText('0')).not.toBeInTheDocument();
    });

    it.skip('displays correct formatting for price', () => {
        renderComponentWithProvider(<SearchAppBar />)
        expect(screen.getByText('$ 9.99')).toBeInTheDocument();
    });

    it.skip('fetches products on search query change', async () => {
        renderComponentWithProvider(<SearchAppBar />)
        const searchInput = screen.getByPlaceholderText('Search…');
        fireEvent.change(searchInput, { target: { value: 'milk' } });

        await waitFor(() => expect(fetchProducts).toHaveBeenCalledTimes(1));
    });
});

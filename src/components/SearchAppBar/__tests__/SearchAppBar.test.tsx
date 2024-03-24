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
jest.mock('../../../store', () => ({
    useAppDispatch: jest.fn(() => jest.fn()),
    useAppSelector: jest.fn().mockReturnValue({
        products: {
            searchQuery: 'mockedSearchQuery'
        }
    })
}));

describe('SearchAppBar Component Tests', () => {

    it('renders SearchAppBar correctly', () => {
        renderComponentWithProvider(<SearchAppBar quantity={5} price={100} />, {
            products: {
                ...initialState.products,
                searchQuery: '',
            },
            cart: {
             ...initialState.cart
            }})
        expect(screen.getByText('FreshCart Market')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument();
        expect(screen.getByText('$ 100.00')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it.skip('handles search input change', () => {
        renderComponentWithProvider(<SearchAppBar quantity={0} price={0} />)

        // Simulate typing into the search input
        const searchInput = screen.getByPlaceholderText('Search…');
        fireEvent.change(searchInput, { target: { value: 'apple' } });

        // Using waitFor to account for debounced change handler
        waitFor(() => expect(fetchProducts).toHaveBeenCalledWith('apple'));
    });

    it.skip('does not display badge when quantity is 0', () => {
        renderComponentWithProvider(<SearchAppBar quantity={0} price={0} />)
        expect(screen.queryByText('0')).not.toBeInTheDocument();
    });

    it.skip('displays correct formatting for price', () => {
        renderComponentWithProvider(<SearchAppBar quantity={0} price={0} />)
        expect(screen.getByText('$ 9.99')).toBeInTheDocument();
    });

    it.skip('fetches products on search query change', async () => {
        renderComponentWithProvider(<SearchAppBar quantity={0} price={0} />)
        const searchInput = screen.getByPlaceholderText('Search…');
        fireEvent.change(searchInput, { target: { value: 'milk' } });

        await waitFor(() => expect(fetchProducts).toHaveBeenCalledTimes(1));
    });
});

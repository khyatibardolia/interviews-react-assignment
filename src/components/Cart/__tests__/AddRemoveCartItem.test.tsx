import {fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {AddRemoveCartItem} from "../AddRemoveCartItem";
import {initialState, mockedProducts} from "../../../mocks/testUtils";
import {renderComponentWithProvider} from "../../../utils/renderComponentWithProvider";

describe('AddRemoveCartItem Component', () => {
    it('renders without crashing', () => {
        renderComponentWithProvider(<AddRemoveCartItem product={mockedProducts[0]} />)
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it.skip('displays the loading indicator when product is being added', async () => {
        renderComponentWithProvider(<AddRemoveCartItem product={mockedProducts[0]} />)
        fireEvent.click(screen.getByLabelText('add'));

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it.skip('increases the quantity in cart when add button is clicked', async () => {
        renderComponentWithProvider(<AddRemoveCartItem product={mockedProducts[0]} />)

        // Initially add a product
        fireEvent.click(screen.getByLabelText('add'));
        await waitFor(async () => {
            await expect(screen.getByText('1')).toBeInTheDocument();
        });
    });

    it.skip('decreases the quantity in cart when remove button is clicked', async () => {
        renderComponentWithProvider(<AddRemoveCartItem product={mockedProducts[0]} />)

        // Initially add a product
        fireEvent.click(screen.getByLabelText('add'));
        await waitFor(async () => {
            await expect(screen.getByText('1')).toBeInTheDocument();
        });

        // Then remove it
        fireEvent.click(screen.getByLabelText('delete'));
        await waitFor(async () => {
           await expect(screen.getByText('0')).toBeInTheDocument();
        });
    });

    it('disables remove button if quantity is 0', () => {
        renderComponentWithProvider(<AddRemoveCartItem product={mockedProducts[0]} />)
        expect(screen.getByLabelText('delete')).toBeDisabled();
    });

    it.skip('shows success message when product is added', async () => {
        renderComponentWithProvider(<AddRemoveCartItem product={mockedProducts[0]} />)
        fireEvent.click(screen.getByLabelText('add'));

        await waitFor(async () => {
            expect(await screen.findByText(`${mockedProducts[0].name} added to cart!`)).toBeTruthy();
        });
    });

    it.skip('shows success/remove message when product is added/removed from cart', async () => {
        renderComponentWithProvider(<AddRemoveCartItem product={mockedProducts[0]} />, initialState)
        // Add product first
        fireEvent.click(screen.getByLabelText('add'));
        expect(screen.queryByText(`${mockedProducts[0].name} added to cart!`)).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByText(`${mockedProducts[0].name} added to cart!`)).toBeInTheDocument();
        }, { timeout: 2000 });

        // Then remove
        fireEvent.click(screen.getByLabelText('delete'));
        await waitFor(() => {
            expect(screen.findByText(`${mockedProducts[0].name} removed from cart!`)).toBeTruthy();
        }, { timeout: 2000 });
    });

});

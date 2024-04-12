import {Categories} from "../Categories";
import {renderComponentWithProvider} from "../../../utils/renderComponentWithProvider";
import {categories} from "../../../mocks/categories";
import {fireEvent, screen} from "@testing-library/react";
import {fetchProducts} from "../../../store/actions/productActions";
import {initialState} from "../../../mocks/testUtils";

// Mocking necessary imports
jest.mock('../../../store', () => ({
    useAppDispatch: () => jest.fn(),
    useAppSelector: jest.fn().mockReturnValue({
        products: {
            categoryQuery: 'mockedCategoryQuery'
        }
    })
}));

jest.mock('../../../store/actions/productActions', () => ({
    setCategoryQuery: jest.fn()
}));

describe('Categories Component Tests', () => {
    it('renders all categories', () => {
        renderComponentWithProvider(<Categories />)
        jest.mock('../../../mocks/categories', () => ({
            categories
        }));
        // Verify if all categories are rendered
        categories.forEach((category) => {
            expect(screen.getByText(category)).toBeInTheDocument();
        });
    });

    it.skip('selected category should have selected attribute', async () => {
        jest.mock('../../../mocks/categories', () => ({
            categories
        }));
        renderComponentWithProvider(<Categories />, {
            products: {
                ...initialState.products,
                categoryQuery: categories[0]
            },
            cart: {
                ...initialState.cart
            },
            checkout: {
                ...initialState.checkout
            }
        })

        // After clicking the category, it should be marked as selected
        fireEvent.click(await screen.getByText(categories[0]));
        const selectedButton = screen.getByText(categories[0]);
        expect(selectedButton).toHaveAttribute('selected', 'true');

        expect(selectedButton).toHaveTextContent(categories[0]);
    });

    it.skip('clicking a category dispatches fetchProducts after setting query', () => {
        renderComponentWithProvider(<Categories />)
        // Click on the first category
        fireEvent.click(screen.getByText(categories[0]));

        expect(fetchProducts).toHaveBeenCalledTimes(2);
    });

    it.skip('renders no categories when categories list is empty', () => {
        jest.mock('../../../mocks/categories', () => ({
            categories: []
        }));
        renderComponentWithProvider(<Categories />)
        const listItems = screen.queryAllByRole('listitem');

        // Assert that there are more than one list items
        expect(listItems.length).toBe(0);

    });
});

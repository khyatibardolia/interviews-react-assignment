import {screen} from '@testing-library/react';
import { ProductCard } from '../ProductCard';
import {renderComponentWithProvider} from "../../../utils/renderComponentWithProvider";

jest.mock('../../HeavyComponent/HeavyComponent', () => ({
    HeavyComponent: () => <div>MockedHeavyComponent</div>,
}));

jest.mock('../../Cart/AddRemoveCartItem', () => ({
    AddRemoveCartItem: () => <button>AddRemoveCartItemButton</button>,
}));

const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 10,
    imageUrl: 'http://example.com/test.jpg',
    category: 'Fruits',
};

describe('ProductCard', () => {
    it('renders correctly with given product details', () => {
        renderComponentWithProvider(<ProductCard product={mockProduct}/>)

        expect(screen.getByText('$10')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', 'http://example.com/test.jpg');

        // Check if HeavyComponent and AddRemoveCartItem are rendered
        expect(screen.getByText('MockedHeavyComponent')).toBeInTheDocument();
        expect(screen.getByText('AddRemoveCartItemButton')).toBeInTheDocument();
    });
});

import { Route, Routes } from 'react-router-dom';
import { Products } from "../components/Products/Products";
import CheckoutStepper from "../components/checkout/stepper/CheckoutStepper";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/checkout" element={<CheckoutStepper />} />
        </Routes>
    );
};

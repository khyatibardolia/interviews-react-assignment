import { Route, Routes } from 'react-router-dom';
import { Products } from "../components/Products/Products";
import CheckoutStepper from "../components/checkout/stepper/CheckoutStepper";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Products />} />
            <Route exact path="/checkout" element={<CheckoutStepper />} />
        </Routes>
    );
};

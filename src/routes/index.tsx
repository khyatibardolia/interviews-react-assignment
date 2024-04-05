import { Route, Routes } from 'react-router-dom';
import React from "react";

const ProductsComponent = React.lazy(() => import('../components/Products/Products'));
const CheckoutStepperComponent = React.lazy(() => import('../components/checkout/stepper/CheckoutStepper'));

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ProductsComponent />} />
            <Route path="/checkout" element={<CheckoutStepperComponent />} />
        </Routes>
    );
};

import {createSlice} from "@reduxjs/toolkit";
import {DeliveryFormData, PaymentFormData} from "../../types/checkout";

interface CheckoutInterface {
    deliveryFormData: DeliveryFormData,
    paymentFormData: PaymentFormData
}

const initialState: CheckoutInterface = {
    deliveryFormData: {
        fullName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        deliverySlot: 'Morning (9 AM - 12 PM)'
    },
    paymentFormData: {
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        nameOnCard: '',
    }
}

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setDeliveryFormData(state, action) {
            state.deliveryFormData = {...state.deliveryFormData, ...action.payload };
        },
        setPaymentFormData(state, action) {
            state.paymentFormData = {...state.paymentFormData, ...action.payload };
        }
    }
})

export const { setDeliveryFormData, setPaymentFormData } = checkoutSlice.actions;
export default checkoutSlice.reducer;
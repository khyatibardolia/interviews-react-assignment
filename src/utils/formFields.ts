export interface DeliveryFormField {
    type: string,
    label: string,
    id: string,
    validation: { required: boolean, pattern?: RegExp },
    options?: string[]
}

export const deliveryFormFields: DeliveryFormField[] = [
    {
        type: 'text',
        label: 'Full Name',
        id: 'fullName',
        validation: { required: true },
    },
    {
        type: 'email',
        label: 'Email',
        id: 'email',
        validation: { required: true, pattern: /^\S+@\S+\.\S+$/i },
    },
    {
        type: 'text',
        label: 'Address',
        id: 'address',
        validation: { required: true },
    },
    {
        type: 'text',
        label: 'City',
        id: 'city',
        validation: { required: true },
    },
    {
        type: 'text',
        label: 'Postal Code',
        id: 'postalCode',
        validation: { required: true, pattern: /^[0-9]{5}$/ },
    },
    {
        type: 'text',
        label: 'Country',
        id: 'country',
        validation: { required: true },
    },
    {
        type: 'select',
        label: 'Delivery Slot',
        id: 'deliverySlot',
        validation: { required: true },
        options: ['Morning (9 AM - 12 PM)', 'Afternoon (1 PM - 4 PM)', 'Evening (5 PM - 8 PM)'],
    },
];

export const paymentFormFields = [
    {
        label: 'Card Number',
        name: 'cardNumber',
        errorText: 'Please enter a valid 16-digit card number',
        validation: (value) => /^\d{16}$/.test(value) && /^\d+$/.test(value),
    },
    {
        label: 'Expiration Date (MM/YY)',
        name: 'expirationDate',
        errorText: 'Please enter a valid expiration date (MM/YY)',
        validation: (value) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(value),
    },
    {
        label: 'CVV',
        name: 'cvv',
        errorText: 'Please enter a valid 3-digit CVV',
        validation: (value) => /^\d{3}$/.test(value) && /^\d+$/.test(value),
    },
    {
        label: 'Name on Card',
        name: 'nameOnCard',
        errorText: 'Please enter the name on the card',
        validation: (value) => !!value,
    },
];
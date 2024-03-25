import {SelectProps, TextField} from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import {DeliveryFormField, deliveryFormFields} from "../../../utils/formFields";

type Props = {
    onFormSubmit: (allFieldsFilled: boolean) => void;
    showErrorMessage: boolean;
}

export const DeliveryAddress: FC<Props> = ({ onFormSubmit, showErrorMessage }: Props) => {
    const [formValues, setFormValues] = useState<{ [key: string]: string }>({
        fullName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        deliverySlot: 'Morning (9 AM - 12 PM)'
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormValues((prevValues: { [key: string]: string }) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    useEffect(() => {
        const isEmailValid = new RegExp(deliveryFormFields.find(field => field.id === 'email').validation.pattern).test(formValues.email);
        const isPostalCodeValid = new RegExp(deliveryFormFields.find(field => field.id === 'postalCode').validation.pattern).test(formValues.postalCode);

        const allFieldsFilled = Object.values(formValues).every((value) => value.trim() !== '')
            && isEmailValid && isPostalCodeValid;
        if (allFieldsFilled) {
            onFormSubmit(true);
        } else {
            onFormSubmit(false);
        }
    }, [formValues, onFormSubmit]);

    const getErrorMessage = (fieldId: string): string => {
        switch (fieldId) {
            case 'email':
                return formValues.email.trim() !== '' ? 'Please enter a valid email address' : 'Field cannot be empty';
            case 'postalCode':
                return formValues.postalCode.trim() !== '' ? 'Postal code should be 5 digits' : 'Field cannot be empty';
            default:
                return 'Field cannot be empty';
        }
    };

    const validateForm = (field) => {
        return ((field.validation.required && formValues[field.id]?.trim() === '') ||
            (field.id === 'email' && !new RegExp(field.validation.pattern).test(formValues[field.id])) ||
            (field.id === 'postalCode' && !new RegExp(field.validation.pattern).test(formValues[field.id]))) && showErrorMessage
    }

    return (
        <form>
            {deliveryFormFields.map((field: DeliveryFormField) => (
                <TextField
                    key={field.id}
                    type={field.type}
                    label={field.label}
                    id={field.id}
                    value={formValues[field.id] || ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    required={field.validation.required}
                    inputProps={{ pattern: field.validation.pattern }}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={validateForm(field)}
                    helperText={validateForm(field) && getErrorMessage(field.id)}
                    select={field.type === 'select'}
                    SelectProps={(field.type === 'select' ? { native: true } : undefined) as SelectProps}
                >
                    {field.type === 'select' &&
                        field.options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                </TextField>
            ))}
        </form>
    );
};

export default DeliveryAddress;

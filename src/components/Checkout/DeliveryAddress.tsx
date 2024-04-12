import {SelectProps, TextField} from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import {DeliveryFormField, deliveryFormFields} from "../../utils/formFields";
import {useAppDispatch, useAppSelector} from "../../store";
import {setDeliveryFormData} from "../../store/reducers/checkoutSlice";
import {DeliveryFormData} from "../../types/checkout";

type Props = {
    onFormSubmit: (allFieldsFilled: boolean) => void;
    showErrorMessage: boolean;
}

export const DeliveryAddress: FC<Props> = ({ onFormSubmit, showErrorMessage }: Props) => {
    const dispatch = useAppDispatch();
    const {deliveryFormData} = useAppSelector((state) => state.checkout);
    const [formValues, setFormValues] = useState<DeliveryFormData>(deliveryFormData);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormValues((prevValues: DeliveryFormData) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    useEffect(() => {
        const field = deliveryFormFields.find((field: DeliveryFormField) => field.id === 'email');
        const isEmailValid = field ? new RegExp(field.validation.pattern as RegExp).test(formValues.email) : false;

        const postalCodeField = deliveryFormFields.find((field: DeliveryFormField) => field.id === 'postalCode');
        const isPostalCodeValid = postalCodeField ? new RegExp(postalCodeField.validation.pattern as RegExp).test(formValues.postalCode) : false;

        const allFieldsFilled = Object.values(formValues).every((value) => value.trim() !== '')
            && isEmailValid && isPostalCodeValid;
        if (allFieldsFilled) {
            onFormSubmit(true);
            dispatch(setDeliveryFormData(formValues));
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

    const validateForm = (field: DeliveryFormField) => {
        return ((field.validation.required && formValues[field.id]?.trim() === '') ||
            (field.id === 'email' && !new RegExp(field.validation.pattern as RegExp).test(formValues[field.id])) ||
            (field.id === 'postalCode' && !new RegExp(field.validation.pattern as RegExp).test(formValues[field.id]))) && showErrorMessage
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
                    FormHelperTextProps={{
                        style: { marginLeft: 0 }
                    }}
                    select={field.type === 'select'}
                    SelectProps={(field.type === 'select' ? { native: true } : undefined) as SelectProps}
                >
                    {field.type === 'select' &&
                         field.options?.map((option: string) => (
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

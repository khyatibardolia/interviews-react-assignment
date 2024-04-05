import {ChangeEvent, FC, useEffect, useState} from 'react';
import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import VisaCardIcon from '../../../assets/images/visa.png';
import MasterCardIcon from '../../../assets/images/mastercard.png';
import AmexCardIcon from '../../../assets/images/amex.png';
import DiscoverCardIcon from '../../../assets/images/discover.png';
import {PaymentFormField, paymentFormFields} from "../../../utils/formFields";

const FormContainer = styled(Box)(() => ({
    maxWidth: '100%',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
}));

const CardIconsContainer = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
}));

const CardIcon = styled('img')({
    width: '60px',
    height: '50px',
});

type Props = {
    onFormSubmit: (allFieldsFilled: boolean) => void;
    showErrorMessage: boolean;
}

type FormData = {
    [key: string]: string;
}

export const Payment: FC<Props> = ({ onFormSubmit, showErrorMessage }: Props) => {
    const [formData, setFormData] = useState<FormData>({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        nameOnCard: '',
    });

    const [errors, setErrors] = useState<FormData>({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        nameOnCard: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        const newErrors = {} as FormData;

        paymentFormFields.forEach((field: PaymentFormField) => {
            if (!formData[field.name] || !field.validation(formData[field.name])) {
                newErrors[field.name] = field.errorText;
            } else {
                delete newErrors[field.name]; // clear error if field is valid
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            /*Todo: make api call to handle payment*/
            onFormSubmit(true);
        } else {
            onFormSubmit(false);
        }
    }, [formData]);

    return (
        <FormContainer>
            <CardIconsContainer>
                <CardIcon src={VisaCardIcon} alt="Visa" />
                <CardIcon src={MasterCardIcon} alt="MasterCard" />
                <CardIcon src={AmexCardIcon} alt="MasterCard" />
                <CardIcon src={DiscoverCardIcon} alt="MasterCard" />
            </CardIconsContainer>
            <form>
                {paymentFormFields.map((field) => (
                    <TextField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        error={!!errors[field.name] && showErrorMessage}
                        helperText={showErrorMessage && errors[field.name]}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                ))}
            </form>
        </FormContainer>
    );
};

import {ChangeEvent, FC, useEffect, useState} from 'react';
import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import VisaCardIcon from '../../assets/images/visa.png';
import MasterCardIcon from '../../assets/images/mastercard.png';
import AmexCardIcon from '../../assets/images/amex.png';
import DiscoverCardIcon from '../../assets/images/discover.png';
import {PaymentFormField, paymentFormFields} from "../../utils/formFields";
import {useAppDispatch, useAppSelector} from "../../store";
import {setPaymentFormData} from "../../store/reducers/checkoutSlice";
import {PaymentFormData} from "../../types/checkout";

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

export const Payment: FC<Props> = ({ onFormSubmit, showErrorMessage }: Props) => {
    const dispatch = useAppDispatch();
    const { paymentFormData } = useAppSelector((state) => state.checkout);
    const [formData, setFormData] = useState<PaymentFormData>(paymentFormData);

    const [errors, setErrors] = useState<PaymentFormData>({
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
        const newErrors = {} as PaymentFormData;

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
            dispatch(setPaymentFormData(formData))
        } else {
            onFormSubmit(false);
        }
    }, [formData]);

    return (
        <FormContainer>
            <CardIconsContainer>
                <CardIcon src={VisaCardIcon} alt="Visa" loading="lazy" />
                <CardIcon src={MasterCardIcon} alt="MasterCard" loading="lazy" />
                <CardIcon src={AmexCardIcon} alt="MasterCard" loading="lazy" />
                <CardIcon src={DiscoverCardIcon} alt="MasterCard" loading="lazy" />
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
                        FormHelperTextProps={{
                            style: { marginLeft: 0 }
                        }}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                ))}
            </form>
        </FormContainer>
    );
};

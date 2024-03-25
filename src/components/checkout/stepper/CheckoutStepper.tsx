import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import {CartRecap} from "./CartRecap";
import {DeliveryAddress} from "./DeliveryAddress";
import {useState} from "react";
import {Payment} from "./Payment";
import {OrderConfirm} from "./OrderConfirm";

const steps = ['Cart', 'Delivery Address', 'Payment'];

export default function CheckoutStepper() {
    const [isDeliveryFormFilled, setIsDeliveryFormFilled] = useState<boolean>(false);
    const [showAddressFormErrorMessages, setShowAddressFormErrorMessages] = useState(false);
    const [isPaymentFormFilled, setIsPaymentFormFilled] = useState<boolean>(false);
    const [showPaymentFormErrorMessages, setShowPaymentFormErrorMessages] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        if(activeStep === 1) {
            handleDeliveryFormSubmit();
            setShowAddressFormErrorMessages(!isDeliveryFormFilled);
        }
        if(activeStep === 2) {
            handlePaymentFormSubmit();
            setShowPaymentFormErrorMessages(!isPaymentFormFilled);
        }
        if (activeStep === 1 && isDeliveryFormFilled) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else if (activeStep === 2 && isPaymentFormFilled) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else if (activeStep !== 1 && activeStep !== 2) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleDeliveryFormSubmit = (isFormFilled: boolean) => {
        setIsDeliveryFormFilled(isFormFilled);
    }

    const handlePaymentFormSubmit = (isFormFilled: boolean) => {
        setIsPaymentFormFilled(isFormFilled);
    }

    const renderStepContent = (activeStep) => {
        switch(activeStep) {
            case 0:
                return <CartRecap/>;
            case 1:
                return <DeliveryAddress onFormSubmit={handleDeliveryFormSubmit}
                                        showErrorMessage={showAddressFormErrorMessages}/>
            case 2:
                return <Payment onFormSubmit={handlePaymentFormSubmit} showErrorMessage={showPaymentFormErrorMessages} />
            default:
                return <></>;
        }
    }
    return (
        <Box sx={{ width: '100%', padding: '40px 20px' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => {
                    const stepProps: { completed?: boolean } = {};

                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <OrderConfirm />
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Box sx={{padding: '40px 20px'}}>
                        {renderStepContent(activeStep)}
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                            variant="contained"
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext} variant="contained" color="primary">
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}
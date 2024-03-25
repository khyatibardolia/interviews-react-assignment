import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const OrderConfirm = () => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="60vh">
            <CheckCircleIcon sx={{ fontSize: 80, color: 'green' }} />
            <Typography variant="h5" align="center" mt={2}>
                Thank you! Your order is confirmed.
            </Typography>
        </Box>
    );
};

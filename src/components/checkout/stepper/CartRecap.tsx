import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import {RootState, useAppSelector} from "../../../store";

export const CartRecap: React.FC = () => {
    const {cart: {items, totalPrice}} = useAppSelector((state: RootState) => state.cart);

    return (
        <Box>
            <Typography variant="h5" component="h2" gutterBottom>
                Cart Items
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Product</b></TableCell>
                            <TableCell><b>Category</b></TableCell>
                            <TableCell><b>Quantity</b></TableCell>
                            <TableCell><b>Price</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.product.id}>
                                <TableCell>{item.product.name}</TableCell>
                                <TableCell>{item.product.category}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>${(item.quantity * item.product.price).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box mt={2} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Typography variant="h5">Total Amount: ${totalPrice.toFixed(2)}</Typography>
            </Box>
        </Box>
    );
};

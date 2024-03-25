import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import {RootState, useAppSelector} from "../../../store";
import {styled} from "@mui/material/styles";

const TableContainerLayout = styled(TableContainer)(() => ({
    maxWidth: '100%',
    padding: '4px 20px 20px 20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
}));

export const CartRecap: React.FC = () => {
    const {cart: {items, totalPrice}} = useAppSelector((state: RootState) => state.cart);

    return (
        <>
            <TableContainerLayout component={Paper} sx={{backgroundColor: '#f9f9f9'}}>
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
            </TableContainerLayout>
            <Box mt={2} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Typography variant="h5">Total Amount: ${totalPrice.toFixed(2)}</Typography>
            </Box>
        </>
    );
};

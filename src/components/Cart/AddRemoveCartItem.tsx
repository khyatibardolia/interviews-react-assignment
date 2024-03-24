import {FC, useState} from "react";
import {Alert, Box, CircularProgress, IconButton, Snackbar, Typography} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {Item} from "../../types/products";
import {useAppDispatch, useAppSelector} from "../../store";
import {CartItem} from "../../types/cart";
import {addToCart} from "../../store/actions/cartActions";

type Props = {
    product: Item;
};

export const AddRemoveCartItem: FC<Props> = ({ product }: Props) => {
    const [showFeedbackMsg, setFeedbackMsgVisibility] = useState<boolean>(false);
    const [isItemAddedToCart, setItemAddedToCart] = useState<boolean>(false);
    const {cart: {items}, loading} = useAppSelector((state) => state.cart);
    const isLoading = loading[product.id] ?? false;
    const dispatch = useAppDispatch();

    const handleAddToCart = async (productId: number, quantity: number) => {
        await dispatch(addToCart({ productId, quantity }));
        setFeedbackMsgVisibility(true);
        setItemAddedToCart(quantity >= 1);
    }

    const quantityInCart = () : number => {
        const item = items.find((item: CartItem) => item.product.id === product.id);
        return item ? item.quantity : 0;
    };

    const handleClose = () => {
        setFeedbackMsgVisibility(false);
    };

    return <Box position="relative" display="flex" flexDirection="row" alignItems="center">
        <Box position="absolute" left={0} right={0} top={0} bottom={0} textAlign="center">
            {isLoading && <CircularProgress size={20}/>}
        </Box>
        <IconButton disabled={isLoading || quantityInCart() === 0} aria-label="delete" size="small"
                    onClick={() => handleAddToCart(product.id, -1)}>
            <RemoveIcon fontSize="small"/>
        </IconButton>

        <Typography variant="body1" component="div" mx={1} data-testid='qty-in-cart'>
            {quantityInCart()}
        </Typography>

        <IconButton disabled={isLoading} aria-label="add" size="small"
                    onClick={() => handleAddToCart(product.id, 1)}>
            <AddIcon fontSize="small"/>
        </IconButton>
        {/* feedback message to improve user experience */}
        <Snackbar
            open={showFeedbackMsg}
            autoHideDuration={2000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                color="info"
                sx={{ width: '100%' }}
            >
                {`${product.name} ${isItemAddedToCart ? 'added to' : 'removed from'} cart!`}
            </Alert>
        </Snackbar>
    </Box>
}
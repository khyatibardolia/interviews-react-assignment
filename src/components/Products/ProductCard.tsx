import {FC, memo} from "react";
import {HeavyComponent} from "../HeavyComponent/HeavyComponent";
import {Box, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {AddRemoveCartItem} from "../Cart/AddRemoveCartItem";
import {Item} from "../../types/products";

type Props = {
    product: Item;
};

/* Preventing Re-renders when the product prop remains the same */
export const ProductCard: FC<Props> = memo(({ product }: Props) => {

    return <Grid item xs={4} key={product.id}>
        {/* Do not remove this */}
        <HeavyComponent/>
        <Card key={product.id} style={{width: '100%'}}>
            <CardMedia
                component="img"
                height="150"
                image={product.imageUrl}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                </Typography>
            </CardContent>
            <CardActions>
                <Typography variant="h6" component="div">
                    ${product.price}
                </Typography>
                <Box flexGrow={1}/>
                <AddRemoveCartItem product={product}/>
            </CardActions>
        </Card>
    </Grid>
})
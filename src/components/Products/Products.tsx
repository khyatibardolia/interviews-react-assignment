import { useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  CircularProgress,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { HeavyComponent } from '../HeavyComponent/HeavyComponent.tsx';
import {useAppDispatch, useAppSelector} from "../../store";
import { fetchProducts } from '../../store/actions/productActions';
import { incrementPage } from '../../store/reducers/productsSlice';
import {Item} from "../../types/products";
import {Cart} from "../../types/cart";

export const Products = ({ onCartChange }: { onCartChange: (cart: Cart) => void }) => {

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();
  const { products, loading, page } = useAppSelector((state) => state.products)


  useEffect(() => {
    // Fetch products only if there are no products loaded and no scroll event has been triggered
      dispatch(fetchProducts());
  }, [dispatch, page]);

  /*function fetchProducts() {
    setLoading(true);
    fetch(`/products?page=${page}&limit=10`)
        .then((response) => response.json())
        .then((data) => {
          if(data.products?.length > 0) {
            setProducts((prevProducts: Product[] | []) => [
              ...prevProducts,
              ...data.products,
            ]);
            setLoading(false);
          }
        });
  }*/

  function handleObserver(entities: IntersectionObserverEntry[]) {
    const target = entities[0];
    if (target.isIntersecting) {
      dispatch(incrementPage());
    }
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '30px',
      threshold: 1,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loaderRef.current instanceof Element) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current instanceof Element) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  function addToCart(productId: number, quantity: number) {
    //Todo: refactor add to cart code
   /* setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          loading: true,
        };
      }
      return product;
    }));
    fetch('/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity }),
    }).then(async response => {
      if (response.ok) {
        const cart = await response.json();
        setProducts(products.map(product => {
          if (product.id === productId) {
            return {
              ...product,
              itemInCart: (product.itemInCart || 0) + quantity,
              loading: false,
            };
          }
          return product;
        }));
        onCartChange(cart);

      }
    });*/
  }

  return (
    <Box overflow="scroll" height="100%">
      <Grid container spacing={2} p={2}>
        {products && products.length && products.map((product: Item, index: number) => (
          <Grid item xs={4} key={`${product.id}-${index}`}>
            {/* Do not remove this */}
            <HeavyComponent/>
            <Card key={product.id} style={{ width: '100%' }}>
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
                <Box position="relative" display="flex" flexDirection="row" alignItems="center">
                  <Box position="absolute" left={0} right={0} top={0} bottom={0} textAlign="center">
                    {product.loading && <CircularProgress size={20}/>}
                  </Box>
                  <IconButton disabled={loading} aria-label="delete" size="small"
                              onClick={() => addToCart(product.id, -1)}>
                    <RemoveIcon fontSize="small"/>
                  </IconButton>

                  <Typography variant="body1" component="div" mx={1}>
                    {product.itemInCart || 0}
                  </Typography>

                  <IconButton disabled={loading} aria-label="add" size="small"
                              onClick={() => addToCart(product.id, 1)}>
                    <AddIcon fontSize="small"/>
                  </IconButton>
                </Box>

              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box ref={loaderRef} sx={{ display: 'flex', justifyContent: 'center',
        visibility: loading ? 'visible' : 'hidden', height: '100px' }}>
        {loading && <CircularProgress size={75} />}
      </Box>
    </Box>
  );
};

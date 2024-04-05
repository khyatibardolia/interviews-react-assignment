import {useEffect, useRef} from 'react';
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../store";
import { fetchProducts } from '../../store/actions/productActions';
import { incrementPage } from '../../store/reducers/productsSlice';
import {Item} from "../../types/products";
import {ProductCard} from "./ProductCard";

const Products = () => {

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const { products, loading, page, hasMore, searchQuery, categoryQuery } = useAppSelector((state) => state.products);

  useEffect(() => {
      dispatch(fetchProducts());
  }, [dispatch, page]);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting && hasMore && !loading) {
      dispatch(incrementPage());
    }
  }

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
  }, [hasMore, loading]);

  /*function addToCart(productId: number, quantity: number) {
    setProducts(products.map(product => {
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
    });
  }
*/

  return (
    <Box overflow="scroll" height="100%">
      <Grid container spacing={2} p={2}>
          {products && products.length > 0 && products.map((product: Item, index: number) => (
              <ProductCard data-testid="product-card" product={product} key={index}/>
          ))
          }
          {!products.length && !loading && (searchQuery || categoryQuery) &&
              <Typography variant="body1"
                          component="div"
                          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
                              width: 1, margin: '40px'}}>
              No Products Found!
          </Typography>}
      </Grid>
      <Box ref={loaderRef} data-testid="loader" sx={{ display: 'flex', justifyContent: 'center',
        visibility: loading ? 'visible' : 'hidden', height: loading ? '100px' : 0 }}>
        {loading && <CircularProgress size={75} />}
      </Box>
    </Box>
  );
};

export default Products;
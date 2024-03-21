import { Products } from './components/Products/Products.tsx';
import { Box, CssBaseline } from '@mui/material';
import SearchAppBar from './components/SearchAppBar/SearchAppBar.tsx';
import { Categories } from './components/Categories/Categories.tsx';
import {useAppSelector} from "./store";

function App() {

  const {cart: {totalPrice, totalItems}} = useAppSelector((state) => state.cart);

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <CssBaseline/>
      <SearchAppBar quantity={totalItems} price={totalPrice}/>
      <Box flex={1} display="flex" flexDirection="row">
        <Categories/>
        <Box flex={1}>
          <Products />
        </Box>
      </Box>

    </Box>
  );
}

export default App;

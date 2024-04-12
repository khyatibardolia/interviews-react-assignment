import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { categories } from "../../mocks/categories";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { setCategoryQuery } from "../../store/reducers/productsSlice";

const drawerWidth = 180;

export const Categories = () => {
    const dispatch = useAppDispatch();
    const categoryQuery = useAppSelector((state: RootState) => state.products.categoryQuery);

    const searchByCategory = (category: string) => {
        dispatch(setCategoryQuery(category))
    }

    return (
    <Box minWidth={drawerWidth} sx={{ borderRight: '1px solid grey' }}>
      <List>
        {categories.map((text: string) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => searchByCategory(text)} selected={categoryQuery === text}>
              <ListItemText primary={text}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

import { Box, CssBaseline } from "@mui/material";
import SearchAppBar from "../components/SearchAppBar/SearchAppBar";
import { Categories } from "../components/Categories/Categories";
import {AppRoutes} from "../routes";
import {useLocation} from "react-router-dom";

const Layout = () => {
    const location = useLocation();
    const isCheckoutPage = location.pathname === '/checkout';

    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <CssBaseline />
            <SearchAppBar />
            <Box flex={1} display="flex" flexDirection="row">
                {!isCheckoutPage && <Categories />}
                <Box flex={1}>
                    <AppRoutes />
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;

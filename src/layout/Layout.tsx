import { Box, CssBaseline } from "@mui/material";
import SearchAppBar from "../components/SearchAppBar/SearchAppBar";
import { Categories } from "../components/Categories/Categories";
import {useLocation} from "react-router-dom";
import {FC, ReactElement} from "react";

type Props = {
    children: ReactElement
}

export const Layout: FC<Props> = ({ children }: Props) => {
    const location = useLocation();
    const isCheckoutPage = location.pathname === '/checkout';

    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <CssBaseline />
            <SearchAppBar />
            <Box flex={1} display="flex" flexDirection="row" sx={{marginTop: '64px'}}>
                {!isCheckoutPage && <Categories />}
                <Box flex={1}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { IconButton } from "@mui/material";
import jwt_decode from "jwt-decode";
import Logo from "components/atoms/Logo";
import ChangeLanguage from "./ChangeLanguage";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { getFromCookies, removeFromCookies } from "util/functions";
const Header = () => {
    const navigate = useNavigate();
    const user = getFromCookies("token");
    var accountId=jwt_decode(user).accountId
    const path = window.location.pathname;
    return (
        <AppBar
            style={{
                backgroundColor:
                    path === "/start" || path === "/users"  || path === "/map"|| path === "/settings" || path === "/table"  ? "#21717b" : "auto",
            }}
            elevation={3}
            position="fixed"
        >
            <Toolbar>
                <Box sx={{ py: 2, flexGrow: 1 }}>
                    <Logo onClick={() => navigate("/start")} />
                </Box>
                <ChangeLanguage />
                <IconButton color="secondary" onClick={() =>{ 
                    if (accountId === "1")
                    navigate("/settings")
                    else
                    navigate("/profile")
                    }}>
                    <SettingsIcon
                        sx={{
                            color:
                                path === "/start" || path === "/users"  || path === "/map" || path === "/settings" || path === "/table"  ? "#dbb33f" : "auto",
                        }}
                    />
                </IconButton >
                 <Box pl={1} >
                    {user && (
                        <IconButton
                        sx={{
                            color:
                                path === "/start" || path === "/users"  || path === "/map" || path === "/settings" || path === "/table" || path === "/statistics" || path === "/profile"  
                                    ? "#dbb33f !important"
                                    : "auto",
                        }}
                      
                            onClick={() => {
                                removeFromCookies("token");
                                navigate(`/`);
                            }}
                        >
                            <LogoutIcon />
                        </IconButton>
                    )}
                </Box> 
            </Toolbar>
        </AppBar>
    );
};
export default Header;
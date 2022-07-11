import { useState } from "react";
import { useTranslation } from "react-i18next";
import { setCookies, getFromCookies } from "util/functions";
import LanguageIcon from "@mui/icons-material/Language";
import {
    Button,
    List,
    ListItemButton,
    ListItemText,
    Popover,
} from "@mui/material";
const ChangeLanguage = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const path = window.location.pathname;
    const { i18n } = useTranslation();
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleListItemClick = (e, lang) => {
        i18n.changeLanguage(lang);
        setCookies("lang", lang);
        handleClose();
    };
    const open = Boolean(anchorEl);
    return (
        <>
            <Button
                color="secondary"
                endIcon={
                    <LanguageIcon
                        sx={{
                            color:
                                path === "/start" || path === "/users"  || path === "/map" || path === "/settings" || path === "/table"  ? "#dbb33f" : "auto",
                        }}
                    />
                }
                onClick={handleClick}
                sx={{
                    px: 2,
                    color:
                        path === "/start" || path === "/users"  || path === "/map" || path === "/settings" || path === "/table" 
                            ? "#dbb33f !important"
                            : "auto",
                }}
            >
                {getFromCookies("lang") || "en"}
            </Button>
            <Popover
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                elevation={3}
                onClose={handleClose}
                open={open}
                PaperProps={{
                    style: {
                        borderRadius:
                            path === "/start" || path === "/users"   ? "8px" : "auto",
                    },
                }}
            >
                <List
                    component="nav"
                    sx={{
                        p: 0,
                        display: path === "/start" || path === "/users"   ? "flex" : "auto",
                        flexDirection:
                            path === "/start" || path === "/users"  ?"column" : "auto",
                    }}
                >
                    <ListItemButton
                        style={{
                            paddingTop:
                                path === "/start" || path === "/users"  ? "8px" : "auto",
                            paddingBottom:
                                path === "/start" || path === "/users"   ? "8px" : "auto",
                            paddingLeft:
                                path === "/start" || path === "/users" ? "16px" : "auto",
                            paddingRight:
                                path === "/start" || path === "/users"   ? "16px" : "auto",
                        }}
                        onClick={(e) => handleListItemClick(e, "en")}
                        selected={getFromCookies("lang") === "en"}
                    >
                        <ListItemText primary="EN" secondary="English" />
                    </ListItemButton>
                    <ListItemButton
                        style={{
                            paddingTop:
                                path === "/start" || path === "/users"  ? "8px" : "auto",
                            paddingBottom:
                                path === "/start" || path === "/users" ? "8px" : "auto",
                            paddingLeft:
                                path === "/start" || path === "/users"  ? "16px" : "auto",
                            paddingRight:
                                path === "/start" || path === "/users" ? "16px" : "auto",
                        }}
                        onClick={(e) => handleListItemClick(e, "hr")}
                        selected={getFromCookies("lang") === "hr"}
                    >
                        <ListItemText primary="HR" secondary="Hrvatski" />
                    </ListItemButton>
                </List>
            </Popover>
        </>
    );
};
export default ChangeLanguage;
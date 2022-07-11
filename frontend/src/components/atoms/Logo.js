import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
const Logo = ({ onClick }) => {
    const { t } = useTranslation();
    const path = window.location.pathname;
    return (
        <>
            <Typography
                onClick={onClick}
                sx={{
                    cursor: onClick ? "pointer" : "default",
                    color: path === "/start" || path === "/users" || path === "/map" || path === "/table"  ? "#fff" : "auto",
                }}
                variant="h5"
            >
                Hotel Pinija
            </Typography>
            <Typography
                sx={{ color: path === "/start" || path === "/users"  || path === "/map" || path === "/table"  ? "#fff" : "auto" }}
                variant="subtitle2"
            >
                {t("tripleHost tracking system")}
            </Typography>
        </>
    );
};
export default Logo;
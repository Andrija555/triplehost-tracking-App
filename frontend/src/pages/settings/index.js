import { useQuery } from "react-query";
import { Typography, Grid } from "@mui/material";
import { getUserProfileSettings } from "../../services/settingsService";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import GroupIcon from "@mui/icons-material/Group";
import Container from "@mui/material/Container";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import { useNavigate } from "react-router-dom";
const Settings = () => {
  const { status, data, error:error1, isFetching } = useQuery("settings", () =>
    getUserProfileSettings()
  );
  console.log(error1)
  const navigate = useNavigate();
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <IconButton
            color="primary"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: 1,
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
            }}
            onClick={() => navigate("/profile")}
          >
            <AccountBoxIcon sx={{ fontSize: 80 }} />
            <Typography sx={{ color: "text.secondary", fontWeight: "bold" }}>
              Profile settings
            </Typography>
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <IconButton
            color="primary"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: 1,
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
            }}
            onClick={() => navigate("/users")}
          >
            <GroupIcon sx={{ fontSize: 80 }} />
            <Typography sx={{ color: "text.secondary", fontWeight: "bold" }}>
              Users
            </Typography>
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <IconButton
            color="primary"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: 1,
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
            }}
            onClick={() => navigate("/")}
          >
            <IntegrationInstructionsIcon sx={{ fontSize: 80 }} />
            <Typography sx={{ color: "text.secondary", fontWeight: "bold" }}>
              Integration
            </Typography>
          </IconButton>
        </Grid>
      </Grid>
      {/* <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <IconButton
          sx={{ display: "flex", flexDirection: "column" }}
          onClick={() => navigate("/profile")}
        >
          <AccountBoxIcon sx={{ fontSize: "60px", color: "#1A5A62" }} />
          <Typography sx={{ color: "#404040", fontWeight: "bold" }}>
            Profile settings
          </Typography>
        </IconButton>
        <IconButton
          sx={{ display: "flex", flexDirection: "column" }}
          onClick={() => navigate("/users")}
        >
          <GroupIcon sx={{ fontSize: "70px", color: "#1A5A62" }} />
          <Typography sx={{ color: "#404040", fontWeight: "bold" }}>
            Users
          </Typography>
        </IconButton>
        <IconButton
          sx={{ display: "flex", flexDirection: "column" }}
          onClick={() => navigate("/")}
        >
          <IntegrationInstructionsIcon
            sx={{ fontSize: "70px", color: "#1A5A62" }}
          />
          <Typography sx={{ color: "#404040", fontWeight: "bold" }}>
            Integration
          </Typography>
        </IconButton>
      </Stack> */}
    </>
  );
};

export default Settings;

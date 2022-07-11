import { TextField, Box, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "components/atoms/Logo";
import { login } from "services/authService";

import { useTranslation } from "react-i18next";

const Login = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Logo />
			<Box sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					required
					fullWidth
					label={t("Username")}
					autoFocus
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					label={t("Password")}
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					onClick={() => login(username, password, navigate)}
				>
					{t("Sign in")}
				</Button>
			</Box>
		</Box>
	);
};

export default Login;

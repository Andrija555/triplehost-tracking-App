import { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import TableViewIcon from "@mui/icons-material/TableView";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BarChartIcon from "@mui/icons-material/BarChart";
import Paper from "@mui/material/Paper";
import { getFromCookies, removeFromCookies } from "util/functions";

const user = getFromCookies("token");
var accountId=jwt_decode(user).accountId

const Footer = () => {
	const { t } = useTranslation();

	const [value, setValue] = useState(window.location.pathname);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		if (window.location.pathname === "/settings") setValue("/statistics");
		return () => {};
	}, [value]);
	if (accountId=="1"){
	return (
		<Paper
			sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
			elevation={3}
		>
			<BottomNavigation value={value} onChange={handleChange}>
				<BottomNavigationAction
					label={t("Start page")}
					value="/start"
					to="/start"
					component={Link}
					icon={<HomeIcon />}
				/>
				<BottomNavigationAction
					label={t("Map view")}
					value="/map"
					to="/map"
					component={Link}
					icon={<LocationOnIcon />}
				/>
				<BottomNavigationAction
					label={t("Table view")}
					value="/table"
					to="/table"
					component={Link}
					icon={<TableViewIcon />}
				/>
				<BottomNavigationAction
					label={t("Statistics")}
					value="/statistics"
					to="/statistics"
					component={Link}
					icon={<BarChartIcon />}
				/>
			</BottomNavigation>
		</Paper>
	);
	}
	else
		return(
			<Paper
			sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
			elevation={3}
		>
			<BottomNavigation value={value} onChange={handleChange}>
				
				<BottomNavigationAction
					label={t("Map view")}
					value="/map"
					to="/map"
					component={Link}
					icon={<LocationOnIcon />}
				/>
				<BottomNavigationAction
					label={t("Table view")}
					value="/table"
					to="/table"
					component={Link}
					icon={<TableViewIcon />}
				/>
				
			</BottomNavigation>
		</Paper>
		)
	
};

export default Footer;

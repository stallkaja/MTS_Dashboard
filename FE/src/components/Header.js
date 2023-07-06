import * as React from "react";

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./Header.module.css"

export default function Header() {
return (
	<AppBar>
		<Toolbar>
		{/*Inside the IconButton, we
		can render various icons*/}
		{/* The Typography component applies
		default font weights and sizes */}

		<Typography variant="h6"
			component="div" sx={{ flexGrow: 1, position:'static !important' }}>
			Support Dashboard
		</Typography>
		<Button color="inherit">Exit</Button>
		</Toolbar>
	</AppBar>
);
}

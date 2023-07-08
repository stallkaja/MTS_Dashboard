import * as React from "react";

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./Header.module.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import lamLogo from '../images/lamLogo2.jpg';
import Avatar from '@mui/material/Avatar';
import AdbIcon from '@mui/icons-material/Adb';

const theme = createTheme({
	status: {
		danger: '#e53e3e',
	},
	palette: {
		primary: {
			main: '#26a69a',
			darker: '#4266f5',
		},
		neutral: {
			main: '#64748B',
			contrastText: '#fff',
		},
	},
});


export default function Header() {
	return (
		<ThemeProvider theme={theme}>
	<AppBar position="static" color="primary">
		<Toolbar>
		{/*Inside the IconButton, we
		can render various icons*/}
		{/* The Typography component applies
		default font weights and sizes */}
					<img
						src={lamLogo} alt="lamlogo" width="2.5%" height="2.5%" />

		<Typography variant="h3"
			component="div" sx={{ flexGrow: 1, position:'static !important', color:"#ffffff", textAlign: "left" }}>
			Support Dashboard
		</Typography>
			<Button sx={{color:"#ffffff"}}>Exit</Button>
		</Toolbar>
			</AppBar>
		</ThemeProvider>
);
}

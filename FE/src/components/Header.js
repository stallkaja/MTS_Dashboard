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

const theme = createTheme({
	status: {
		danger: '#e53e3e',
	},
	palette: {
		primary: {
			main: '#001f3f',
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

		<Typography variant="h3"
			component="div" sx={{ flexGrow: 1, position:'static !important', color:"#ffffff", textAlign: "center" }}>
			Support Dashboard
		</Typography>
			<Button sx={{color:"#ffffff"}}>VFD</Button>
			<Button sx={{color:"#ffffff"}}>KM</Button>
			<Button sx={{color:"#ffffff"}}>SAP</Button>
			<Button sx={{color:"#ffffff"}}>Exit</Button>
		</Toolbar>
			</AppBar>
		</ThemeProvider>
);
}

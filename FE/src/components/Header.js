import * as React from "react";

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styles from "./Header.module.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import lamLogo from '../images/lamLogo2.jpg';
import {Button, Space, ConfigProvider} from 'antd';
import { LogoutOutlined } from '@ant-design/icons'; 

function Header() {

const theme = createTheme({
	status: {
		danger: '#e53e3e',
	},
	palette: {
		primary: {
			main: '#20a785',
			darker: '#4266f5',
		},
		neutral: {
			main: '#64748B',
			contrastText: '#fff',
		},
	},
});

	return (
		<ConfigProvider
		theme={{
			token: {
				colorLink: '#ffffff',
				colorLinkHover: '#6ce3c6',
				colorLinkActive: '#20A785'
			},
		}}>
			
			<ThemeProvider theme={theme}>
				<div className={styles.header}>
					<AppBar position="static" sx={{boxShadow: '0'} }>
					<Toolbar>
		{/*Inside the IconButton, we
		can render various icons*/}
		{/* The Typography component applies
		default font weights and sizes */}
					<img src={lamLogo} alt="lamlogo" width="2.5%" height="2.5%" />

		<Typography variant="h3"
							component="div" sx={{ flexGrow: 1, position: 'static !important', color: "#ffffff", textAlign: "left"}}>
			Support Dashboard
							</Typography>		
			<Space wrap>
				<Button type="link" href="https://vfd.fremont.lamrc.net/" target="_blank"><b>VFD</b></Button>
				<Button type="link" href="https://kmmatrix.fremont.lamrc.net/" target="_blank"><b>KM</b></Button>
				<Button type="link" href="../../tx.sap" download="tx.sap"><b>SAP</b></Button> 
				<Button type="link"><b>Logout </b>{<LogoutOutlined/>}</Button>
			</Space>

		</Toolbar>
					</AppBar>
			</div>
		</ThemeProvider>
		</ConfigProvider>
    );
}

export default Header;                
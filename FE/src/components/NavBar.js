import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavBarElements.js';

const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink to='/' activestyle>
			LandingPage
		</NavLink>
		<NavLink to='/TicketDashboard' activestyle>
			Ticket Dashboard
		</NavLink>
		<NavLink to='/MaterialListPage' activestyle>
			Material List
		</NavLink>
		<NavLink to='/Map' activestyle>
			DOS Map
		</NavLink>
		<NavLink to='/ScanTool' activestyle>
			Scan Tool
		</NavLink>
		<NavLink to='/ToolHistory' activestyle>
			Tool Info
		</NavLink>
		<NavLink to='/toolRequest' activestyle>
			Tool Requests
		</NavLink>
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
{/* 		<NavBtn>
		<NavBtnLink to='/signin'>Sign In</NavBtnLink>
		</NavBtn> */}
	</Nav>
	</>
);
};

export default Navbar;

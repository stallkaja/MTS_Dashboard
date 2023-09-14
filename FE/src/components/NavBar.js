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
		    </NavMenu>
	    </Nav>
	    </>
    );
};

export default Navbar;

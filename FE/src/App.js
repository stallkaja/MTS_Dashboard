
import React from 'react';
import './App.css';
import ScanToolPage from './pages/ScanToolPage.js'
import ToolHistoryPage from './pages/ToolHistoryPage.js'
import ToolRequestPage from './pages/ToolRequestPage.js'
import LandingPage from './pages/LandingPage.js'
import MaterialListPage from './pages/MaterialListPage.js'
import MapPage from './pages/MapPage.tsx'
import CreateMaterialPage from './pages/CreateMaterialPage.js'
import TicketDashboard from './pages/TicketDashboard.tsx'
import MaterialOrderingPage from './pages/MaterialOrderingPage.tsx';
import Sidenav from './components/sidenav';
import LoginPage from './components/LoginPage.js';
import TicketPage from './pages/TicketPage.js'
import OrderPage from './pages/OrderPage.js'
import Header from "./components/Header";
import useToken from './components/useToken.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import ToolInfoForm from './pages/ToolInfoForm.js';
import styles from "./components/Header.module.css"

  function App() {
	const [ItemToEdit, setItemToEdit] = useState();
	const { token, setToken } = useToken();
	//test
	if(!token) {
		return <LoginPage setToken={setToken} />
  	}
	return (
	<div>
			<div>
				<Header setToken={setToken}/>
			</div>

		<div className="App" style={{position: "relative"}} >
			<Sidenav/>
			<main>
			<Routes>
        		<Route path='/' element={<LandingPage/>} />
				<Route path='/TicketDashboard' element={<TicketDashboard/>} />
        		<Route path='/MaterialListPage' exact element={<MaterialListPage setItemToEdit={setItemToEdit}/>}   />
				<Route path='/MaterialOrderingPage' element={<MaterialOrderingPage/>} />
        		<Route path='/Map' element={<MapPage/>} />
        		<Route path='/ScanTool' element={<ScanToolPage/>} setItemToEdit={setItemToEdit}/>
        		<Route path='/ToolHistory' element={<ToolHistoryPage/>} />
        		<Route path='/toolRequest' element={<ToolRequestPage/>} />
        		<Route path='/createMaterial' element={<CreateMaterialPage/>} />
                <Route path='/ticketPage' element={<TicketPage />} />
				<Route path='/OrderPage' element={<OrderPage />} />
                <Route path='/ToolInfoForm' element={<ToolInfoForm/>} />
				<Route path='/LoginPage' element={<LoginPage/>} />
				</Routes>
      		</main>
    	</div>
	</div>
  );
}

export default App;

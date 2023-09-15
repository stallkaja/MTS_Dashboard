
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
import TicketsListPage from './pages/ticketsListPage.tsx'
import KitBasePage from './pages/kitBasePage.tsx'
import KitFormPage from './pages/KitFormPage.js'
import SwicBasePage from './pages/swicBasePage.tsx'
import ToolPullListPage from './pages/toolPullListPage.js'
import PassDownPage from './pages/passDownPage.js';
import PassdownForm from './pages/PassdownForm.js';
import PtoRequestForm from './pages/PtoRequestForm.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import ToolInfoForm from './pages/ToolInfoForm.js';
import styles from "./components/Header.module.css";
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
import MaterialRequestForm from './pages/MaterialRequestForm.js';
//import Terst from './pages/terst.js';

const { Footer } = Layout;

const emailFac = () => {

}

const emailSwic = () => {

}

const emailCtu = () => {

}

const emailSwat = () => {

}
function App() {
	const [ItemToEdit, setItemToEdit] = useState();
	const { token, setToken } = useToken();
	if(!token) {
		return <LoginPage setToken={setToken} />
	}
	
	return (
		<div>
	        <Layout className="layout">
                <div>
				    <Header />
			    </div>

		        <div className="App" style={{position: "relative"}} >
			        <Sidenav/>
			        <main>
				        <Routes>
        			        <Route path='/' element={<LandingPage/>} />
					        <Route path='/TicketDashboard' element={<TicketDashboard/>} />
        			        <Route path='/MaterialListPage' exact element={<MaterialListPage setItemToEdit={setItemToEdit}/>}   />
					        <Route path='/MaterialOrderingPage' element={<MaterialOrderingPage/>} />
        			        <Route path='/map' element={<MapPage/>} />
        			        <Route path='/ScanTool' element={<ScanToolPage/>} setItemToEdit={setItemToEdit}/>
        			        <Route path='/ToolHistory' element={<ToolHistoryPage/>} />
        			        <Route path='/toolRequest' element={<ToolRequestPage/>} />
        			        <Route path='/createMaterial' element={<CreateMaterialPage/>} />
					        <Route path='/ticketPage' element={<TicketPage />} />
					        <Route path='/OrderPage' element={<OrderPage />} />
					        <Route path='/ToolInfoForm' element={<ToolInfoForm/>} />
					        <Route path='/TicketsList' element={<TicketsListPage/>} />
					        <Route path='/KitBasePage' element={<KitBasePage/>} />
					        <Route path='/KitFormPage' element={<KitFormPage/>} />
					        <Route path='/SwicBase' element={<SwicBasePage/>} />
					        <Route path='/ToolPullList' element={<ToolPullListPage/>} />
					        <Route path='/PassDownPage' element={<PassDownPage />} />
					        <Route path='/PassdownForm' element={<PassdownForm />} />
					        <Route path='/PtoRequestForm' element={<PtoRequestForm />} />
                            <Route path='/MaterialRequestForm' element={<MaterialRequestForm />} />
				        </Routes>
      		        </main>
			    </div>

			    <div id="Footer">
			        <Footer style={{ background: 'linear-gradient(to right, #242437 10%, #20A785)', textAlign: 'right', color: 'white'}}>
					    Contact: 
						<Button 
                            type="Link"
                            size="large"
                            onClick={emailFac}
                        >
                            Facilites Kits
                        </Button>

						<Button
                            type="Link"
                            size="Large"
                            onClick={emailSwic}
                        >
                            SWIC
                        </Button>

						<Button
                            type="Link"
                            size="Large"
                            onClick={emailCtu}
                        >
                            CTU
                        </Button>

						<Button
                            type="Link"
                            size="Large"
                            onClick={emailSwat}
                        >
                            SWAT
                        </Button>
					</Footer>
			    </div>
			</Layout>
	    </div>
    );
}

export default App;

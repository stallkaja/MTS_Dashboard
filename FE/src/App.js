
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
import Footer from "./components/Footer";
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
import { Breadcrumb, Layout, Menu, theme, Button, ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import MaterialRequestForm from './pages/MaterialRequestForm.js';

function App() {
    const [ItemToEdit, setItemToEdit] = useState();
    const { token, setToken } = useToken();
    if (!token) {
        return <LoginPage setToken={setToken} />
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorLink: 'white',
                        colorLinkHover: '#6ce3c6',
                        colorLinkActive: '#20A785'
                    }
                },
            }}>
            <Layout className="layout">
                <div>
                    <Header />
                </div>

                <div className="App" style={{ position: "relative" }} >
                    <Sidenav />
                    <main>
                        <Routes>
                            <Route path='/' element={<LandingPage />} />
                            <Route path='/TicketDashboard' element={<TicketDashboard />} />
                            <Route path='/MaterialListPage' exact element={<MaterialListPage setItemToEdit={setItemToEdit} />} />
                            <Route path='/MaterialOrderingPage' element={<MaterialOrderingPage />} />
                            <Route path='/map' element={<MapPage />} />
                            <Route path='/ScanTool' element={<ScanToolPage />} setItemToEdit={setItemToEdit} />
                            <Route path='/ToolHistory' element={<ToolHistoryPage />} />
                            <Route path='/toolRequest' element={<ToolRequestPage />} />
                            <Route path='/createMaterial' element={<CreateMaterialPage />} />
                            <Route path='/ticketPage' element={<TicketPage />} />
                            <Route path='/OrderPage' element={<OrderPage />} />
                            <Route path='/ToolInfoForm' element={<ToolInfoForm />} />
                            <Route path='/TicketsList' element={<TicketsListPage />} />
                            <Route path='/KitBasePage' element={<KitBasePage />} />
                            <Route path='/KitFormPage' element={<KitFormPage />} />
                            <Route path='/SwicBase' element={<SwicBasePage />} />
                            <Route path='/ToolPullList' element={<ToolPullListPage />} />
                            <Route path='/PassDownPage' element={<PassDownPage />} />
                            <Route path='/PassdownForm' element={<PassdownForm />} />
                            <Route path='/PtoRequestForm' element={<PtoRequestForm />} />
                            <Route path='/MaterialRequestForm' element={<MaterialRequestForm />} />
                        </Routes>
                    </main>
                </div>


                <div id="Footer">
                    <Footer />
                </div>
            </Layout>
        </ConfigProvider>


    );
}

export default App;

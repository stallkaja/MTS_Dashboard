import React from 'react';
import OpenTicketATable from '../components/OpenTicketATable';
import ClosedTicketATable from '../components/ClosedTicketATable';
import "./swicBasePage.css";
import { useNavigate } from 'react-router';
import { Button, ConfigProvider } from 'antd';

const TicketDashboard: React.FC = () => {
    const navigate = useNavigate();
    const OpenTicket = () => {
        let path = '/TicketPage';
        navigate(path);
    }


    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#000000',
                    colorTextLightSolid: '#000000',
                    colorBorder: '#242437',
                    colorPrimaryHover: '#6ce3c6'
                },
            }}>

            <div id='SWICBaseCard'>
                <h1 id='SBTitle'>SWIC Base</h1>

                <h1 id='SBSearch'> Search Bar Place Holder</h1>
            </div>

            <div id='NRCard'>

                <div id='NRTitle'>New Release</div>

                <div id="CreateSLButton">
                    <Button size="large" onClick={() => OpenTicket()}>
                        {"New SWIC Log"}
                    </Button>
                </div>
            </div>
            <OpenTicketATable />

            
            <div id='WIPCard'>
                <div id='WIPText'>Work In Progress</div>
            </div>

            <ClosedTicketATable />

            <div id='ClosedSLCard'>
                <div id='CloseSLTitle'>Closed</div>
            </div>

            <ClosedTicketATable />

        </ConfigProvider>
    );
};

export default TicketDashboard
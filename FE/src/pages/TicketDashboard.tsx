import React from 'react';
import OpenTicketATable from '../components/OpenTicketATable';
import ClosedTicketATable from '../components/ClosedTicketATable';
import "./TicketDashboard.css";
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

            {/*<div>*/}
            <div id='TicketDashCard'>
                <h1 id='TicketTitle'>Ticket Dashboard</h1>
                 
                <h1 id='TicketSearch'> Search Bar Place Holder</h1>
            </div>
                
            <div id='OpenTicketCard'>
                
                <div id='OpenTicketTitle'>Open and In Progress Tickets</div>             
                
                <div id="CreateTicketButton">
                    <Button size="large" onClick={() => OpenTicket()}>
                        {"Create Ticket"}
                    </Button>
                </div>
            </div>
            <OpenTicketATable />

            {/* <ItemTable headers ={headers} items={items} onEdit={onEdit} onDelete={onDelete}/> */}
            <div id='ClosedTicketCard'>
                <div id='CloseTicketTitle'>Closed and Under Review</div>
            </div>

            <ClosedTicketATable />
            {/*</div>*/}
        </ConfigProvider>
    );
};

export default TicketDashboard
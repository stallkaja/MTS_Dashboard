import React from 'react';
import OpenTicketATable from '../components/OpenTicketATable';
import ClosedTicketATable from '../components/ClosedTicketATable';
import "./TicketDashboard.css";
import { useNavigate } from 'react-router';
import { Button, Space, ConfigProvider } from 'antd';

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
                    colorPrimary: '#6ce3c6',
                    colorBorder: '#242437',
                    colorPrimaryHover: '#c74f26'
                },
            }}>
        
        <div>
            <div id='OpenTicketCard'>
                <div>
                    <h1 id='OpenTicketTitle'>Open and In Progress Tickets</h1>
                </div>
                <div id="CreateTicketButton">
                    <Button  type="primary"  size="large" onClick={() => OpenTicket()}>
                        {"Create Ticket"}
                    </Button>
                </div>
            </div>
            <OpenTicketATable />

            {/* <ItemTable headers ={headers} items={items} onEdit={onEdit} onDelete={onDelete}/> */}
            <div id='ClosedTicketCard'>
                <h1 id='CloseTicketTitle'>Closed and Under Review</h1>
            </div>

            <ClosedTicketATable/>
        </div>
        </ConfigProvider>
    );
};

export default TicketDashboard
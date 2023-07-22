import React from 'react';
import OpenTicketATable from '../components/OpenTicketATable';
import ClosedTicketATable from '../components/ClosedTicketATable';
import "./TicketDashboard.css";
import { useNavigate } from 'react-router';
import { Button, ConfigProvider } from 'antd';

const TicketDashboard: React.FC = () => {
    const navigate = useNavigate();
    const OpenForm = () => {
        let path = '/KitFormPage';
        navigate(path);
    }

  
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ffffff',
                    colorTextLightSolid: '#000000',
                    colorBorder: '#242437',
                    colorPrimaryHover: '#e0ded6'
                },
            }}>
            
            <div>
                <div id='TicketDashCard'>
                    <h1 id='TicketTitle'>Ticket Dashboard</h1>
                 
                    <h1 id='TicketSearch'> Search Bar Place Holder</h1>
                </div>
                
            <div id='OpenTicketCard'>
                <div>
                    <div id='OpenTicketTitle'>New Kits</div>
                    </div>
                
                <div id="CreateTicketButton">
                    <Button type="primary" size="large" onClick={() => OpenForm()}>
                        {"New Facility Kit Entry"}
                    </Button>
                </div>
            </div>
            <OpenTicketATable />

            {/* <ItemTable headers ={headers} items={items} onEdit={onEdit} onDelete={onDelete}/> */}
            <div id='ClosedTicketCard'>
                <div id='CloseTicketTitle'>Closed and Under Review</div>
            </div>

            <ClosedTicketATable/>
        </div>
        </ConfigProvider>
    );
};

export default TicketDashboard
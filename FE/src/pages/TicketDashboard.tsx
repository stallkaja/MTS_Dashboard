import React from 'react';
import OpenTicketATable from '../components/OpenTicketATable';
import ClosedTicketATable from '../components/ClosedTicketATable';
import "./TicketDashboard.css";
import { useNavigate } from 'react-router';
import { Button, Space } from 'antd';

const TicketDashboard = () => {
    const navigate = useNavigate();
    const OpenTicket = () => {
        let path = '/TicketPage';
        navigate(path);
    }

  
    return (

        <div>
            <div id='OpenTicketCard'>
                <div>
                    <h1 id='OpenTicketTitle'>Open and In Progress Tickets</h1>
                </div>
                <div id="CreateTicketButton">
                    <Button  type="primary"  size="large" colorPrimary="#004d40" onClick={() => OpenTicket()}>
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

    );
};

export default TicketDashboard
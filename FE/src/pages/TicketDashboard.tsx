import React from 'react';
import OpenTicketATable from '../components/OpenTicketATable';
import ClosedTicketATable from '../components/ClosedTicketATable';
import { useNavigate } from 'react-router';
import { Button, Space } from 'antd';

const TicketDashboard = () => {
    const navigate = useNavigate();
    const OpenTicket = () => {
        let path = '/TicketPage';
        navigate (path);
    }

  
    return(
        <div>
        
            <h1>Open and In Progress Tickets</h1>
            <Button type="primary" onClick={() => OpenTicket()}>
              {"Create Ticket"}
            </Button>
            <table>
            <OpenTicketATable/> </table>
            {/* <ItemTable headers ={headers} items={items} onEdit={onEdit} onDelete={onDelete}/> */}
                <h1>Closed and Under Review</h1>
            <table><ClosedTicketATable/></table>
        </div>

    );
};

export default TicketDashboard
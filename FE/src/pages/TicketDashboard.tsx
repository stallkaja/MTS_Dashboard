import React from 'react';
import OpenTicketATable from '../components/OpenTicketATable';
import ClosedTicketATable from '../components/ClosedTicketATable';
import { useNavigate } from 'react-router';


const TicketDashboard = () => {
    const navigate = useNavigate();
    const OpenTicket = () => {
        let path = '/TicketPage';
        navigate (path);
    }
    
  
    return(
        <div>
            <h1>Open and In Progress Tickets</h1>
            <button onClick={() => OpenTicket()}>
              {"Create Ticket"}
            </button>
            <OpenTicketATable/>
            {/* <ItemTable headers ={headers} items={items} onEdit={onEdit} onDelete={onDelete}/> */}
            <h1>Closed and Under Review</h1>
            <ClosedTicketATable/>
        </div>

    );
};

export default TicketDashboard
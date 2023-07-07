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
        
            <h1 style={{ textAlign: "center" }}>Open and In Progress Tickets</h1>
            <buttonStyle>  
            <button onClick={() => OpenTicket()}>
              {"Create Ticket"}
                </button>
            </buttonStyle>
            <table>
            <OpenTicketATable/> </table>
            {/* <ItemTable headers ={headers} items={items} onEdit={onEdit} onDelete={onDelete}/> */}
                <h1 style={{ textAlign: "center"} }>Closed and Under Review</h1>
            <table><ClosedTicketATable/></table>
        </div>

    );
};

export default TicketDashboard
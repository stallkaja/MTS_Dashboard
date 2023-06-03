import React from 'react';
import ItemTable from '../components/ItemTable';
import OpenTicketATable from '../components/OpenTicketATable';
import ClosedTicketATable from '../components/ClosedTicketATable';


const TicketDashboard = () => {
    
  
    return(
        <div>
            <h1>Open and In Progress Tickets</h1>
            <OpenTicketATable/>
            {/* <ItemTable headers ={headers} items={items} onEdit={onEdit} onDelete={onDelete}/> */}
            <h1>Closed and Under Review</h1>
            <ClosedTicketATable/>
        </div>

    );
};

export default TicketDashboard
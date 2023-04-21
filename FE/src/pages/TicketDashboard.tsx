import React from 'react';
import ItemTable from '../components/ItemTable';
import InventoryATable from '../components/InventoryATable';


const TicketDashboard = () => {
    
  
    return(
        <div>
            <h1>Open and In Progress Tickets</h1>
            <InventoryATable/>
            {/* <ItemTable headers ={headers} items={items} onEdit={onEdit} onDelete={onDelete}/> */}
            <h1>closed and Under Review</h1>
        </div>

    );
};

export default TicketDashboard
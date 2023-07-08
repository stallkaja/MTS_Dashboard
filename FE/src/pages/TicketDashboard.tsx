import React from 'react';
import OpenTicketATable from '../components/OpenTicketATable';
import ClosedTicketATable from '../components/ClosedTicketATable';
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
        <div1>
            <h1>Open and In Progress Tickets</h1>
                

                   <buttonRight>     
                    <Button style={{ width: '100%'}}type="primary"  size="large" colorPrimary="#004d40" block onClick={() => OpenTicket()}>
                    {"Create Ticket"}
                </Button>
            </buttonRight>

               
            </div1>
            <table>
                <OpenTicketATable /> </table>

            {/* <ItemTable headers ={headers} items={items} onEdit={onEdit} onDelete={onDelete}/> */}
            <h1 style={{textAlign: "center"} }>Closed and Under Review</h1>
            <table><ClosedTicketATable/></table>
        </div>

    );
};

export default TicketDashboard
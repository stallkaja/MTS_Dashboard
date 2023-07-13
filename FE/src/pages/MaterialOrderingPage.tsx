import React from 'react';
import OpenTicketATable from '../components/OpenTicketATable';
import ClosedTicketATable from '../components/ClosedTicketATable';
import { useNavigate } from 'react-router';
import { Button, Space, ConfigProvider } from 'antd';
import './MaterialOrderingPage.css';

const TicketDashboard = () => {
    const navigate = useNavigate();
    const OpenTicket = () => {
        let path = '/OrderPage';
        navigate (path);
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

                        <h1> Material Ordering</h1>
 
        <div id='AwaitingCard'>
                <h1 id='AwaitingText'>Awaiting Approval</h1>
            <div id='CreateButton'>
            <Button type="primary" onClick={() => OpenTicket()}>
              {"Create New Order"}
                    </Button>
                </div>
            </div>
            <main>
            <OpenTicketATable />
            
            {/* <ItemTable headers ={headers} items={items} onEdit={onEdit} onDelete={onDelete}/> */}
                <div id='SubmittedCard'>
            <div id='SubmittedText'>
                    <h1>Submitted</h1>
                    </div>
                    </div>
            <ClosedTicketATable />

                <div id='ArrivedCard'>
                    <div id='ArrivedText'>
                        <h1>Arrived</h1>
                    </div>
                </div>
                <ClosedTicketATable />

            </main>


            </div>
        </ConfigProvider>

    );
};

export default TicketDashboard
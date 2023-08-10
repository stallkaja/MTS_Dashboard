import React from 'react';
import OpenOrderATable from '../components/OpenOrderATable';
import ClosedTicketATable from '../components/ClosedTicketATable';
import { useNavigate } from 'react-router';
import { Button, ConfigProvider } from 'antd';
import './MaterialOrderingPage.css';

const TicketDashboard = () => {
    const navigate = useNavigate();
    const OpenTicket = () => {
        let path = '/MaterialRequestForm';
        navigate (path);
    }
    
  
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#000000',
                    colorTextLightSolid: '#000000',
                    colorBorder: '#242437',
                    colorPrimaryHover: '#6ce6c6'
                },
            }}>
        <div>
            <div id='MatTitleCard'>
                    <h1 id='TitleText'>Material Ordering</h1>
            </div>
        <div id='AwaitingCard'>
                <div id='AwaitingText'>Awaiting Approval</div>
            <div id='CreateButton'>
            <Button onClick={() => OpenTicket()}>
              {"Create New Order"}
                    </Button>
                </div>
            </div>
            <main>
            <OpenOrderATable />
            
            {/* <ItemTable headers ={headers} items={items} onEdit={onEdit} onDelete={onDelete}/> */}
                <div id='SubmittedCard'>
            <div id='SubmittedText'>
                    Submitted
                    </div>
                    </div>
            <ClosedTicketATable />

                <div id='ArrivedCard'>
                    <div id='ArrivedText'>
                        Arrived
                    </div>
                </div>
                <ClosedTicketATable />

            </main>


            </div>
        </ConfigProvider>

    );
};

export default TicketDashboard
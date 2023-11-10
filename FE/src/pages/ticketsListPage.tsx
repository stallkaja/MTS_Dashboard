import React from 'react';
import { useState } from 'react';
import OpenTicketATable from '../components/OpenTicketATable';
import ClosedTicketATable from '../components/ClosedTicketATable';
import "./TicketDashboard.css";
import { useNavigate } from 'react-router';
import { Button, ConfigProvider } from 'antd';
import ColumnChange from '../components/ColumnChange';

const TicketDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [hiddenArray, setHiddenArray] = useState({
        key: 1,
        keey: 2,
        keeey: 3
    });
    const [hideList, setHideList] = useState([]);
    const OpenTicket = () => {
        let path = '/TicketPage';
        navigate(path);
    }
    //Data being returned from columnChange component, to be passed to child tables
    const parent = (childData) => {
        return (
            setHiddenArray(childData)


        )
    }

  
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#000000',
                    colorTextLightSolid: '#000000',
                    colorBorder: '#242437',
                    colorPrimaryHover: '#6ce3c6'
                },
            }}>
            
            <div>
                <div id='TicketDashCard'>
                    <h1 id='TicketTitle'>Help Tickets</h1>
                 
                    <h1 id='TicketSearch'>
                        <ColumnChange
                            tName='ticketstable'
                            parentPass={parent}
                            hideList={hideList} />
                    </h1>
                </div>
                
                <div id='OpenTicketCard'>
                    <div>
                        <div id='OpenTicketTitle'>Open and In Progress Tickets</div>
                    </div>
                
                    <div id="CreateTicketButton">
                        <Button 
                            //type="primary" 
                            size="large"
                            onClick={() => OpenTicket()}
                        >
                            {"Create Ticket"}
                        </Button>
                    </div>
                </div>
                <OpenTicketATable
                    hideArray={hiddenArray} />
       
                <div id='ClosedTicketCard'>
                    <div id='CloseTicketTitle'>Closed and Under Review</div>
                </div>

                <ClosedTicketATable
                    hideArray={hiddenArray} />
            </div>
        </ConfigProvider>
    );
};

export default TicketDashboard
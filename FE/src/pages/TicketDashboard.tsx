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
    const [hiddenArray, setHiddenArray] = useState({ key: 1 });
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
    const excel = () => {
        //This space left intentionally blank
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

            <div id='TicketDashCard'>
                <h1 id='TicketTitle'>Ticket Dashboard</h1>
                 
                <h1 id='TicketSearch'>
                    <ColumnChange
                        tName='ticketstable'
                        parentPass={parent}
                        hideList={hideList} />
                </h1>
            </div>
                
            <div id='OpenTicketCard'>
                
                <div id='OpenTicketTitle'>Open and In Progress Tickets</div>             
                
                <div id="CreateTicketButton">
                    <Button size="large" onClick={() => OpenTicket()}>
                        {"Create Ticket"}
                    </Button>
                </div>
            </div>

            <div id="TicketTableOpen">
                <OpenTicketATable
                    hideArray={hiddenArray}
                    tableDataCallBack={excel} />
            </div>
            {/*
            <div id='ClosedTicketCard'>
                <div id='CloseTicketTitle'>Closed and Under Review</div>
            </div>
            
            <ClosedTicketATable
                hideArray={hiddenArray}  />*/}
        </ConfigProvider>
    );
};

export default TicketDashboard
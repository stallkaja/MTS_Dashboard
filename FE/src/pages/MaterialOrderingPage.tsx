import React from 'react';
import { useState } from 'react';
import OpenOrderATable from '../components/OpenOrderATable';
import SubmittedOrdersATable from '../components/SubmittedOrdersATable';
import ClosedOrderATable from '../components/ClosedOrderATable';
import ColumnChange from '../components/ColumnChange';
import GlobalSearch from '../components/GlobalSearchBar';
import { useNavigate } from 'react-router';
import { Button, ConfigProvider } from 'antd';
import './MaterialOrderingPage.css';

const TicketDashboard = () => {
    const navigate = useNavigate();
    const [hiddenArray, setHiddenArray] = useState({
        key: 1,
        keey: 2,
        keeey: 3
    });
    const [hideList, setHideList] = useState([
        'Email',
        'PreferredVendor',
        'PurchNumber',
        'AdminComments',
        'AttachFile'
    ])

    //Button navigation to Material Request Form
    const OpenTicket = () => {
        let path = '/MaterialRequestForm';
        navigate (path);
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
                    colorPrimaryHover: '#6ce6c6'
                },
            }}>
        <div>
            <div id='MatTitleCard'>
                    <h1 id='TitleText'>Material Ordering</h1>
                    <ColumnChange
                        tName='materialorderstable'
                        parentPass={parent}
                        hideList={hideList} />
                    <GlobalSearch
                        tName={["materialorderstable", "orderlineitemstable"]}
                        //tName2="orderlineitemstable"
                        />
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
                <OpenOrderATable 
                        hideArray={hiddenArray} />
            
                <div id='SubmittedCard'>
                    <div id='SubmittedText'>
                        Submitted
                    </div>
                </div>
                <SubmittedOrdersATable
                        hideArray={hiddenArray} />

                <div id='ArrivedCard'>
                    <div id='ArrivedText'>
                        Arrived
                    </div>
                </div>
                <ClosedOrderATable
                        hideArray={hiddenArray} />

            </main>


            </div>
        </ConfigProvider>

    );
};

export default TicketDashboard
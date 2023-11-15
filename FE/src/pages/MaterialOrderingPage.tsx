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
    const [searchResults, setSearchResults] = useState();
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
    const columnChangeCallBack = (colChangeCallBackData) => {
        return (
            setHiddenArray(colChangeCallBackData)
        )
    }
    const searchCallBack = (searchCallBackData) => {
        console.log("setting search results on page")
        return (
            setSearchResults(searchCallBackData)
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
                        columnChangeCallBack={columnChangeCallBack}
                        hideList={hideList} />
                    <GlobalSearch
                        tName={["materialorderstable" , "orderlineitemstable"]}
                        searchCallBack={searchCallBack}
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
                        hideArray={hiddenArray} searchResults={searchResults} />
                <div id='SubmittedCard'>
                    <div id='SubmittedText'>
                        Submitted
                    </div>
                </div>
                <SubmittedOrdersATable
                        hideArray={hiddenArray} searchResults={searchResults}/>
                <div id='ArrivedCard'>
                    <div id='ArrivedText'>
                        Arrived
                    </div>
                </div>
                <ClosedOrderATable
                        hideArray={hiddenArray} searchResults={searchResults}/>
            </main>


            </div>
        </ConfigProvider>

    );
};

export default TicketDashboard
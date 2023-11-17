import React from 'react';
import { useState, useEffect } from 'react';
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
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [openSearchResults, setOpenSearchResults] = useState([]);
    const [submittedSearchResults, setSubmittedSearchResults] = useState([]);
    const [closedSearchResults, setClosedSearchResults] = useState([]);
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
        console.log(searchCallBackData)
        return (
            setSearchResults(searchCallBackData)
        )
    }
    useEffect(() => {
        console.log(searchResults)
        var open =[];
        var submitted=[]
        var closed = []
        console.log(searchResults.length)
        for (let i = 0; i < searchResults.length; i++) {

            if(searchResults[i].Status == 'awaitingApproval'){
                open.push(searchResults[i])
            }
            else if(searchResults[i].Status == 'submitted'){
                submitted.push(searchResults[i])
            }
            else if(searchResults[i].Status == 'arrived'){
                closed.push(searchResults[i])
            }
            else{
                console.log('error ',searchResults[i])
            }
        
        }
        console.log(open)
        console.log(submitted)
        console.log(closed)
        setOpenSearchResults(open)
        setSubmittedSearchResults(submitted)
        setClosedSearchResults(closed)
    },[searchResults])
  
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
                        hideArray={hiddenArray} searchResults={openSearchResults} />
                <div id='SubmittedCard'>
                    <div id='SubmittedText'>
                        Submitted
                    </div>
                </div>
                <SubmittedOrdersATable
                        hideArray={hiddenArray} searchResults={submittedSearchResults}/>
                <div id='ArrivedCard'>
                    <div id='ArrivedText'>
                        Arrived
                    </div>
                </div>
                <ClosedOrderATable
                        hideArray={hiddenArray} searchResults={closedSearchResults}/>
            </main>


            </div>
        </ConfigProvider>

    );
};

export default TicketDashboard
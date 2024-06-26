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
import ExcelExport from '../components/ExcelExport';

const OrderingDashboard = () => {
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [openSearchResults, setOpenSearchResults] = useState([]);
    const [submittedSearchResults, setSubmittedSearchResults] = useState([]);
    const [closedSearchResults, setClosedSearchResults] = useState([]);
    const [hiddenArray, setHiddenArray] = useState({
        key: 1
    });
    //var excelData = {};
    const [excelData1, setExcelData1] = useState({});
    const [excelData2, setExcelData2] = useState({});
    const [excelData3, setExcelData3] = useState({});
    const [excelMain, setExcelMain] = useState({});
    const [hideList, setHideList] = useState([
        'Email',
        'PreferredVendor',
        'PurchNumber',
        'AdminComments',
        'AttachFile'
    ])
    const [linesData, setLinesData] = useState({});

    //Button navigation to Material Request Form
    const OpenTicket = () => {
        let path = '/MaterialRequestForm';
        navigate (path);
    }

    //Data being returned from columnChange component, to be passed to child tables
    const parentPass = (colChangeCallBackData) => {
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
        //console.log(open)
        //console.log(submitted)
        //console.log(closed)
        setOpenSearchResults(open)
        setSubmittedSearchResults(submitted)
        setClosedSearchResults(closed)
    },[searchResults])

    const lines = (childData) => {
        setLinesData(childData)
    }

    const excel1 = (childData) => {
        console.log(childData)
        setExcelData1(childData)    
    }
    const excel2 = (childData) => {
        console.log(childData)
        setExcelData2(childData)
    }
    const excel3 = (childData) => {
        console.log(childData)
        setExcelData3(childData)
    }

    const buildTable = () => {
        let excelMain2 = { ...excelData1, ...excelData2, ...excelData3 }
        console.log(excelMain2)
        console.log(linesData)
        /*const excelDataCreate = () => {
            if ((JSON.stringify(orderData) !== JSON.stringify({ key: 1 })) && (JSON.stringify(linesDict) !== JSON.stringify({ key: 1 }))) {
                let lineKeys = Object.keys(linesDict)

                for (let i = 0; i < orderData.length; i++) {
                    delete orderData[i]['key']
                    if (lineKeys.includes(orderData[i].RequestNumber.toString())) {

                        for (let j = 0; j < linesDict[orderData[i].RequestNumber].length; j++) {
                            delete linesDict[orderData[i].RequestNumber][j]['PK']
                            delete linesDict[orderData[i].RequestNumber][j]['RequestNumber']
                            linesDict[orderData[i].RequestNumber][j]['PartName' + j] = linesDict[orderData[i].RequestNumber][j]['PartName']
                            delete linesDict[orderData[i].RequestNumber][j]['PartName']
                            linesDict[orderData[i].RequestNumber][j]['PartNumber' + j] = linesDict[orderData[i].RequestNumber][j]['PartNumber']
                            delete linesDict[orderData[i].RequestNumber][j]['PartNumber']
                            linesDict[orderData[i].RequestNumber][j]['PricePer' + j] = linesDict[orderData[i].RequestNumber][j]['PricePer']
                            delete linesDict[orderData[i].RequestNumber][j]['PricePer']
                            linesDict[orderData[i].RequestNumber][j]['Quantity' + j] = linesDict[orderData[i].RequestNumber][j]['Quantity']
                            delete linesDict[orderData[i].RequestNumber][j]['Quantity']
                            linesDict[orderData[i].RequestNumber][j]['Status' + j] = linesDict[orderData[i].RequestNumber][j]['Status']
                            delete linesDict[orderData[i].RequestNumber][j]['Status']
                            orderData[i] = { ...orderData[i], ...linesDict[orderData[i].RequestNumber][j] }
                        }
                    }
                }
                tableDataCallBack(orderData)
            }
        }
        useEffect(() => excelDataCreate(), [linesDict, orderData])*/
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
                    parentPass={parentPass}
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

                        <ExcelExport
                            tabledData={excelMain}
                            hidingArray={hiddenArray}
                            ogList={hideList}
                            tableRun={buildTable}  />
                </div>
            </div>
            <main>
                <OpenOrderATable 
                        hideArray={hiddenArray}
                        searchResults={openSearchResults}
                        tableDataCallBack={excel1}
                        linesCallBack={lines} />
                <div id='SubmittedCard'>
                    <div id='SubmittedText'>
                        Submitted
                    </div>
                </div>
                <SubmittedOrdersATable
                        hideArray={hiddenArray}
                        searchResults={submittedSearchResults}
                        tableDataCallBack={excel2} />
                <div id='ArrivedCard'>
                    <div id='ArrivedText'>
                        Arrived
                    </div>
                </div>
                <ClosedOrderATable
                        hideArray={hiddenArray}
                        searchResults={closedSearchResults}
                        tableDataCallBack={excel3} />
            </main>


            </div>
        </ConfigProvider>

    );
};

export default OrderingDashboard
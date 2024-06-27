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
    const [excelData1, setExcelData1] = useState([]);
    const [excelData2, setExcelData2] = useState([]);
    const [excelData3, setExcelData3] = useState([]);
    const [excelMain, setExcelMain] = useState([]);
    const [hideList, setHideList] = useState([
        'Email',
        'PreferredVendor',
        'PurchNumber',
        'AdminComments',
        'AttachFile'
    ])
    const [linesData, setLinesData] = useState([]);

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
        return(
            setExcelData1(childData)   
        )
    }
    const excel2 = (childData) => {
        console.log(childData)
        return(
            setExcelData2(childData)
        )
    }
    const excel3 = (childData) => {
        console.log(childData)
        return(
            setExcelData3(childData)
        )
    }
    useEffect(() => {
        let excelTemp = excelData1.concat(excelData2, excelData3)
        setExcelMain(excelTemp)
    }, [excelData1, excelData2, excelData3])

    const buildTable = () => {
        console.log(excelMain)
        console.log(linesData)
        let lineKeys = Object.keys(linesData)
        for (let i = 0; i < excelMain.length; i++) {
            delete excelMain[i]['key']
            if (lineKeys.includes(excelMain[i].RequestNumber.toString())) {
                for (let j = 0; j < linesData[excelMain[i].RequestNumber].length; j++) {
                    delete linesData[excelMain[i].RequestNumber][j]['PK']
                    delete linesData[excelMain[i].RequestNumber][j]['RequestNumber']
                    linesData[excelMain[i].RequestNumber][j]['PartName' + j] = linesData[excelMain[i].RequestNumber][j]['PartName']
                    delete linesData[excelMain[i].RequestNumber][j]['PartName']
                    linesData[excelMain[i].RequestNumber][j]['PartNumber' + j] = linesData[excelMain[i].RequestNumber][j]['PartNumber']
                    delete linesData[excelMain[i].RequestNumber][j]['PartNumber']
                    linesData[excelMain[i].RequestNumber][j]['PricePer' + j] = linesData[excelMain[i].RequestNumber][j]['PricePer']
                    delete linesData[excelMain[i].RequestNumber][j]['PricePer']
                    linesData[excelMain[i].RequestNumber][j]['Quantity' + j] = linesData[excelMain[i].RequestNumber][j]['Quantity']
                    delete linesData[excelMain[i].RequestNumber][j]['Quantity']
                    linesData[excelMain[i].RequestNumber][j]['Status' + j] = linesData[excelMain[i].RequestNumber][j]['Status']
                    delete linesData[excelMain[i].RequestNumber][j]['Status']
                    excelMain[i] = { ...excelMain[i], ...linesData[excelMain[i].RequestNumber][j] }
                }
            }
        }
        console.log(excelMain)
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
                    <div id='Button'>
                        <Button onClick={() => OpenTicket()}>
                        {"Create New Order"}
                        </Button>
                    </div>
                    <div id='Button'>
                        <ExcelExport
                            tabledData={excelMain}
                            hidingArray={hiddenArray}
                            ogList={hideList}
                            tableRun={buildTable}  />
                    </div>
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
import React from 'react';
import { useState, useEffect } from 'react';
import OpenTicketATable from '../components/OpenTicketATable';
import ClosedTicketATable from '../components/ClosedTicketATable';
import "./TicketListPage.css";
import { useNavigate } from 'react-router';
import { Button, ConfigProvider } from 'antd';
import ColumnChange from '../components/ColumnChange';
import ExcelExport from '../components/ExcelExport';

const TicketDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [hiddenArray, setHiddenArray] = useState({ key: 1 });
    const [hideList, setHideList] = useState([]);
    const [excelData1, setExcelData1] = useState([]);
    const [excelData2, setExcelData2] = useState([]);
    const [excelMain, setExcelMain] = useState([]);
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
    const excel1 = (childData) => {
        console.log(childData)
        return (
            setExcelData1(childData)
        )
    }
    const excel2 = (childData) => {
        console.log(childData)
        return (
            setExcelData2(childData)
        )
    }
    const tableNone = () => {
        //This space left intentionally blank
    }
    useEffect(() => {
        let excelTemp = excelData1.concat(excelData2)
        setExcelMain(excelTemp)
    }, [excelData1, excelData2])

  
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
                    <div id='OpenTicketTitle'>Open and In Progress Tickets</div>
                
                    <div id="CreateTicketButton">
                        <div id="Button">
                            <Button 
                                onClick={() => OpenTicket()} >
                                {"Create Ticket"}
                            </Button>
                        </div>
                        <div id="Button">
                            <ExcelExport
                                tabledData={excelMain}
                                hidingArray={hiddenArray}
                                ogList={hideList}
                                tableRun={tableNone} />
                        </div>

                    </div>
                </div>
                <OpenTicketATable
                    hideArray={hiddenArray}
                    tableDataCallBack={excel1} />
       
                <div id='ClosedTicketCard'>
                    <div id='CloseTicketTitle'>Closed and Under Review</div>
                </div>

                <ClosedTicketATable
                    hideArray={hiddenArray}
                    tableDataCallBack={excel2} />
            </div>
        </ConfigProvider>
    );
};

export default TicketDashboard
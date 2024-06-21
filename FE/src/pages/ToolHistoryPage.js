
import React from 'react';
import { useState } from 'react';
import ToolInfoATable from '../components/ToolinfoATable';
import { useNavigate, Link } from 'react-router';
import './ToolHistoryPage.css';
import { Button, ConfigProvider } from 'antd';
import ColumnChange from '../components/ColumnChange';
import ExcelExport from '../components/ExcelExport';


  
const ToolHistoryPage = () => {
    const navigate = useNavigate();
    const OpenForm = () => {
        let path = '/ToolInfoForm';
        navigate (path);
    }
    const [hiddenArray, setHiddenArray] = useState({
        key: 1,
        keey: 2,
        keeey: 3
    });
    const [excelData, setExcelData] = useState({});
    const [hideList, setHideList] = useState(['PK', 'Status']);
    const OpenTicket = () => {
        let path = '/TicketPage';
        navigate(path);
    }
    //Data being returned from columnChange component, to be passed to child tables
    const parent = (childData) => {
        return (
            console.log(childData),
            setHiddenArray(childData)
        )
    }

    const toExcel = (childData) => {
        console.log(childData)
        for (let i = 0; i < childData.length; i++) {
            if (hiddenArray == null) {
                //if (hideList.includes(childData[i]){

                //}
            }
        }
        return (
            setExcelData(childData)
        )
    }

    //console.log(hiddenArray)


    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#6ce3c6',
                    colorTextLightSolid: '#000000',
                    colorBorder: '#242437',
                    colorPrimaryHover: '#6ce3c6'
                },
            }}>
        
            <div>
                <div id='ToolTitleCard'>
                    <h1 id='ToolTitle'>Calibrated Tool Information Page</h1>
                    <h1 id='ToolSearch'>
                        <ColumnChange
                            tName='caltoolstable'
                            parentPass={parent}
                            hideList={hideList} />
                    </h1>
                </div>

                <div id='ToolHeader'>           
                    <div id='ToolButton'>
                        <Button onClick={() => OpenForm()}>
                        {"Create New Tool"}
                        </Button>
                    </div>

                    <div id='ToolButton2'>
                        <ExcelExport
                            tabledData={excelData} />
                    </div>
                </div>
                
                <ToolInfoATable
                    hideArray={hiddenArray}
                    tableDataCallBack={toExcel} 
                    />
            </div>

        </ConfigProvider>
    );
};
  
export default ToolHistoryPage;
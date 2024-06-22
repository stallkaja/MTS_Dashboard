
import React from 'react';
import './toolPullList.css';
import { Button, ConfigProvider, DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import ColumnChange from '../components/ColumnChange';
import StaggerPullListTable from '../components/StaggerPullListTable';
import ExcelExport from '../components/ExcelExport';


  
const ToolPullListPage = () => {
    const [hiddenArray, setHiddenArray] = useState({
        key: 1
    });
    const [excelData, setExcelData] = useState({ key: 1 });
    const [hideList, setHideList] = useState(['PK','Status']);
    //Data being returned from columnChange component, to be passed to child tables
    const parent = (childData) => {
        return (
            setHiddenArray(childData)
        )
    }
    const excel = (childData) => {
        setExcelData((childData))
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

                <div id='PullTitleCard'>
                    <h1 id='ToolTitle'>Staggering List</h1>
                    <h1 id='ToolSearch'>
                        <ColumnChange
                            tName='caltoolstable'
                            parentPass={parent}
                            hideList={hideList} />
                    </h1>
                </div>
                <div id='PullHeader'>
                <div id='PullButton'></div>
                    <div id='PullButton2'>
                        <ExcelExport
                            tabledData={excelData}
                            hidingArray={hiddenArray}
                            ogList={hideList} />
                    </div>
                </div>
                <StaggerPullListTable
                    hideArray={hiddenArray}
                    tableDataCallBack={excel} />                   
            </div>
        </ConfigProvider>
    );
};
  
export default ToolPullListPage;
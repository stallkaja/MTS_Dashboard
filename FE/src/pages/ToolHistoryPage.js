
import React from 'react';
import { useState } from 'react';
import ToolInfoATable from '../components/ToolinfoATable';
import { useNavigate, Link } from 'react-router';
import './ToolHistoryPage.css';
import { Button, ConfigProvider } from 'antd';
import ColumnChange from '../components/ColumnChange';


  
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
                </div>
                
                <ToolInfoATable
                    hideArray={hiddenArray} />
            </div>
        </ConfigProvider>
    );
};
  
export default ToolHistoryPage;
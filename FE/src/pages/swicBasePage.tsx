import React from 'react';
import { useState } from 'react';
import "./swicBasePage.css";
import { useNavigate } from 'react-router';
import { Button, ConfigProvider } from 'antd';
import ColumnChange from '../components/ColumnChange';
import SwicWIPTable from '../components/SwicWIPTable';
import SwicNRTable from '../components/SwicNRTable';
import SwicCompletedTable from '../components/SwicCompletedTable';

const SWICDashboard: React.FC = () => {
    const navigate = useNavigate();
    const OpenLog = () => {
        let path = '/SwicForm';
        navigate(path);
    }
    const [hideList, setHideList] = useState(['PK']);
    const [hiddenArray, setHiddenArray] = useState({ key: 1 });
    //Data being returned from columnChange component, to be passed to child tables
    const parent = (childData) => {
        return (setHiddenArray(childData))
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
            <ColumnChange
                tName='swiclogtable'
                parentPass={parent}
                hideList={hideList} />
            <div id='SWICBaseCard'>
                <h1 id='SBTitle'>SWIC Base</h1>

                <h1 id='SBSearch'> Search Bar Place Holder</h1>
            </div>

            <div id='NRCard'>

                <div id='NRTitle'>New Release</div>

                <div id="CreateSLButton">
                    <Button size="large" onClick={() => OpenLog()}>
                        {"New SWIC Log"}
                    </Button>
                </div>
            </div>
            <SwicNRTable hideArray={hiddenArray}/>

            
            <div id='WIPCard'>
                <div id='WIPText'>Work In Progress</div>
            </div>

            <SwicWIPTable hideArray={hiddenArray}/>

            <div id='ClosedSLCard'>
                <div id='CloseSLTitle'>Completed</div>
            </div>
           
            <SwicCompletedTable hideArray={hiddenArray}/>

        </ConfigProvider>
    );
};

export default SWICDashboard
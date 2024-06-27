import React from 'react';
import OpenTicketATable from '../components/OpenTicketATable';
import ClosedTicketATable from '../components/ClosedTicketATable';
import "./TicketDashboard.css";
import { useNavigate } from 'react-router';
import { Button, ConfigProvider } from 'antd';
import ColumnChange from '../components/ColumnChange';
import { useState } from 'react';

const KitDashboard: React.FC = () => {
    const navigate = useNavigate();
    const OpenForm = () => {
        let path = '/KitFormPage';
        navigate(path);
    }
    const [hideList, setHideList] = useState([]);
    const [hiddenArray, setHiddenArray] = useState({
        key: 1,
        keey: 2,
        keeey: 3
    });
    //Data being returned from columnChange component, to be passed to child tables
    const parent = (childData) => {
        return (setHiddenArray(childData))
    }
    const excel1 = () => {
        //This space left intentionally blank
    }

    const excel2 = () => {
        //This space left intentionally blank
    }
  
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ffffff',
                    colorTextLightSolid: '#000000',
                    colorBorder: '#242437',
                    colorPrimaryHover: '#e0ded6'
                },
            }}>
            <ColumnChange
                tName='ticketstable'
                parentPass={parent}
                hideList={hideList} />
            <div>
                <div id='TicketDashCard'>
                    <h1 id='TicketTitle'>Ticket Dashboard</h1>
                 
                    <h1 id='TicketSearch'> Search Bar Place Holder</h1>
                </div>
                
                <div id='OpenTicketCard'>
                    <div>
                        <div id='OpenTicketTitle'>New Kits</div>
                    </div>
                
                    <div id="CreateTicketButton">
                        <Button type="primary" size="large" onClick={() => OpenForm()}>
                            {"New Facility Kit Entry"}
                        </Button>
                    </div>
                </div>
                <OpenTicketATable
                    hideArray={hiddenArray}
                    tableDataCallBack={excel1} />

            
                <div id='ClosedTicketCard'>
                    <div id='CloseTicketTitle'>Completed Kits</div>
                </div>

                <ClosedTicketATable
                    hideArray={hiddenArray}
                    tableDataCallBack={excel1}/>
            </div>
        </ConfigProvider>
    );
};

export default KitDashboard
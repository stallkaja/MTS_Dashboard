import React from 'react';
import NewFacKitATable from '../components/NewFacKitATable';
import CompFacKitATable from '../components/CompFacKitATable';
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
    const [hideList, setHideList] = useState([
        'PK',
        'BuiltID',
        'BuiltDate',
        'InspectID',
        'InspectDate',
        'IssueID',
        'IssueDate',
        'ReturnID',
        'ReturnDate',
        'VerID',
        'VerDate',
        'CompID',
        'CompDate']);
    const [hiddenArray, setHiddenArray] = useState({ key: 1 });
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
                tName='fackitstable'
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
                <NewFacKitATable
                    hideArray={hiddenArray}
                    tableDataCallBack={excel1} />

            
                <div id='ClosedTicketCard'>
                    <div id='CloseTicketTitle'>Completed Kits</div>
                </div>

                <CompFacKitATable
                    hideArray={hiddenArray}
                    tableDataCallBack={excel1}/>
            </div>
        </ConfigProvider>
    );
};

export default KitDashboard
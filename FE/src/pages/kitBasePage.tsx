import React from 'react';
import NewFacKitATable from '../components/NewFacKitATable';
import BuiltFacKitATable from '../components/BuiltFacKitATable';
import InsFacKitATable from '../components/InsFacKitATable';
import IssFacKitATable from '../components/IssFacKitATable';
import RetFacKitATable from '../components/RetFacKitATable';
import CompFacKitATable from '../components/CompFacKitATable';
import "./KitBasePage.css";
import { useNavigate } from 'react-router';
import { Button, ConfigProvider, Collapse } from 'antd';
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
    const onChange = (key) => {
        console.log(key)
    }
    const items = [
        {
            key: '1',
            label: 'New Kits',
            children: <NewFacKitATable
                hideArray={hiddenArray}
                tableDataCallBack={excel1} />
        },
        {
            key: '2',
            label: 'Built Kits',
            children: <BuiltFacKitATable
                hideArray={hiddenArray}
                tableDataCallBack={excel1} />
        },
        {
            key: '3',
            label: 'Inspected Kits',
            children: <InsFacKitATable
                hideArray={hiddenArray}
                tableDataCallBack={excel1} />
        },
        {
            key: '4',
            label: 'Issued Kits',
            children: <IssFacKitATable
                hideArray={hiddenArray}
                tableDataCallBack={excel1} />
        },
        {
            key: '5',
            label: 'Returned Kits',
            children: <RetFacKitATable
                hideArray={hiddenArray}
                tableDataCallBack={excel1} />
        },
        {
            key: '6',
            label: 'Completed Kits',
            children: <CompFacKitATable
                hideArray={hiddenArray}
                tableDataCallBack={excel1} />
        }
    ]
  
    return (
        <ConfigProvider
            theme={{
                components: {
                    Collapse: { headerBG:'#000000'}
                },
                token: {
                    colorPrimary: '#ffffff',
                    colorTextLightSolid: '#000000',
                    colorBorder: '#242437',
                    colorPrimaryHover: '#e0ded6',

                },
            }}>

                <div id='TicketDashCard'>
                    <h1 id='TicketTitle'>KitBase</h1>
                    <ColumnChange
                        tName='fackitstable'
                        parentPass={parent}
                        hideList={hideList} />                 
                    <h1 id='TicketSearch'> Search Bar Place Holder</h1>
                </div>
                <div id='OpenTicketCardKits'>
                    <div id="CreateTicketButtonKits">
                        <Button type="primary" size="large" onClick={() => OpenForm()}>
                            {"New Facility Kit Entry"}
                        </Button>
                    </div>
                </div>
                <div id="Collapse">
                <Collapse
                    items={items}
                    onChange={onChange}
                    style={{
                        fontColor: '#000000'
                    }} />
                </div>
        </ConfigProvider>
    );
};

export default KitDashboard
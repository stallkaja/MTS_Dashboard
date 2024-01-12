
import React from 'react';
import ToolInfoATable from '../components/ToolinfoATable';
import { useNavigate} from 'react-router';
import './toolPullList.css';
import { Button, ConfigProvider, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import ColumnChange from '../components/ColumnChange';
import StaggerPullListTable from '../components/StaggerPullListTable';
import OverdueListTable from '../components/OverdueListTable';
import LostListTable from '../components/LostListTable';


  
const ToolPullListPage = () => {
    const navigate = useNavigate();
    const GenList = () => {
        alert('James!!!!')
    }
    const [today, setToday] = useState(dayjs());
    const handleDate = (date, dateString) => {
        setToday(dateString)
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

                <div id='ToolHeader'>
                    <div id='ToolButton'>

                    </div>
                </div>
                <div id='DatePickerBox'>
                <h1>Under construction</h1>
                </div>
                <div id='DatePickerBox'>
                    <h1>Today:</h1>
                    <DatePicker 
                        value={dayjs(today)}
                        onChange={handleDate}
                        allowClear={false}
                    />
                </div>
                <div id='PullCard'>
                    <div id='PullText'>Pull List</div>
                    <div id='GenerateButton'>
                        <Button onClick={() => GenList()}>
                            {"Generate List"}
                        </Button>
                    </div>
                </div>
                <StaggerPullListTable
                    hideArray={hiddenArray} />
                <div id='OverdueCard'>
                    <div id='OverdueText'>Overdue Tools</div>
                </div>
                <OverdueListTable
                    hideArray={hiddenArray} />
                <div id='LostCard'>
                    <div id='LostText'>Lost Tools</div>
                </div>
                <LostListTable
                    hideArray={hiddenArray} />    
                    
            </div>
        </ConfigProvider>
    );
};
  
export default ToolPullListPage;
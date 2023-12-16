
import React from 'react';
import ToolInfoATable from '../components/ToolinfoATable';
import { useNavigate} from 'react-router';
import './toolPullList.css';
import { Button, ConfigProvider, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';


  
const ToolHistoryPage = () => {
    const navigate = useNavigate();
    const GenList = () => {
        alert('James!!!!')
    }
    const [today, setToday] = useState(dayjs());
    const handleDate = (date, dateString) => {
        setToday(dateString)
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
                <div id='OverdueCard'>
                    <div id='OverdueText'>Overdue Tools</div>
                </div>
                <div id='LostCard'>
                    <div id='LostText'>Lost Tools</div>
                </div>
                    
                    
            </div>
        </ConfigProvider>
    );
};
  
export default ToolHistoryPage;
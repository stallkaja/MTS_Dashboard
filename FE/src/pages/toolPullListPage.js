
import React from 'react';
import ToolInfoATable from '../components/ToolinfoATable';
import { useNavigate} from 'react-router';
import './toolPullList.css';
import { Button, ConfigProvider, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';


  
const ToolHistoryPage = () => {
    const navigate = useNavigate();
    const OpenForm = () => {
        let path = '/ToolInfoForm';
        navigate (path);
    }
    const [today, setToday] = useState(dayjs());

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
                        <Button onClick={() => OpenForm()}>
                            {"Generate List"}
                        </Button>
                    </div>
                </div>
                {/*<ToolInfoATable />*/}
                Under construction
                <br />
                Today:
                <DatePicker 
                    value={dayjs(today)}
                />
                    
                    
            </div>
        </ConfigProvider>
    );
};
  
export default ToolHistoryPage;
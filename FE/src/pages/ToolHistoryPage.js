
import React from 'react';
import ToolInfoATable from '../components/ToolinfoATable';
import { useNavigate, Link } from 'react-router';
import './ToolHistoryPage.css';
import { Button, Space, ConfigProvider } from 'antd';


  
const ToolHistoryPage = () => {
    const navigate = useNavigate();
    const OpenForm = () => {
        let path = '/ToolInfoForm';
        navigate (path);
    }

    /*const buttonPayload = {
        title: 'create',
        key: 'key',
        dataIndex: 'key',

    }*/

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
        
        <div>
            
                <div id='ToolHeader'>
                <h1 style={{float: 'left', transform: 'translateY(-30%)', color: 'white', paddingLeft: '10px'} }>Calibrated Tool Information Page</h1>
            
            <h1 id='ToolButton'>
                    <Button type="primary" onClick={() => OpenForm()}>              {"Create New Tool"}
            </Button>
                </h1>
            </div>
                
                <ToolInfoATable />
            
            </div>
    </ConfigProvider>
  );
};
  
export default ToolHistoryPage;
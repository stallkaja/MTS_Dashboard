
import React from 'react';
import ToolInfoATable from '../components/ToolinfoATable';
import { useNavigate, Link } from 'react-router';
import './toolPullList.css';
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
                <div id='TitleCard'>
                    <h1 id='ToolTitle'>Staggering List</h1>
                </div>
                <div id='ToolHeader'>
                
            
            <div id='ToolButton'>
                    <Button type="primary" onClick={() => OpenForm()}>              {"Generate List"}
            </Button>
                </div>
            </div>
                
                <ToolInfoATable />
            
            </div>
    </ConfigProvider>
  );
};
  
export default ToolHistoryPage;
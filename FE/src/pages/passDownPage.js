
import React from 'react';
import PassDownTable from '../components/PassDownTable';
import { useNavigate, Link } from 'react-router';
import { Button, ConfigProvider } from 'antd';
import './PassdownPage.css';


  
const PassdownPage = () => {
    const navigate = useNavigate();
    const OpenForm = () => {
        let path = '/PassdownForm';
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
                    colorPrimary: '#000000',
                    colorTextLightSolid: '#000000',
                    colorBorder: '#242437',
                    colorPrimaryHover: '#6ce3c6'
                },
            }}>
        
        <div>
            
            <div id='PassTitleCard'>
                <h1 id='PassTitle'>Passdown</h1>
            </div>
            <div id='PassHeader'>
                <div id='PassButton'>
                    <Button onClick={() => OpenForm()}>              {"Create New Passdown"}</Button>
                </div>
            </div>
                
                <PassDownTable />
            
         </div>
    </ConfigProvider>
  );
};
  
export default PassdownPage;
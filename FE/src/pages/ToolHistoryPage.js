
import React from 'react';
import ToolInfoATable from '../components/ToolinfoATable';
import { useNavigate, Link } from 'react-router';
import ToolHistoryPageStyles from './ToolHistoryPage.module.css';
import { Button, Space } from 'antd';


  
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

        
        <div>
        <main>
                <h1 style={{ textAlign: 'left'} }>Calibrated Tool Information Page</h1>
            
            <div className={ToolHistoryPageStyles.button}>
            <Button type="primary" onClick={() => OpenForm()}>
              {"Create New Tool"}
            </Button>
            </div>
                <ToolInfoATable />
            </main>
    </div>
  );
};
  
export default ToolHistoryPage;
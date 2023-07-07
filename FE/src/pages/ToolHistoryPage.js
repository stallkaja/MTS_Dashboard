
import React from 'react';
import ToolInfoATable from '../components/ToolinfoATable';
import { useNavigate, Link } from 'react-router';
import ToolHistoryPageStyles from './ToolHistoryPage.module.css';


  
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
            <h1 style={{ textAlign: "center" }}>Calibrated Tool Information Page</h1>
            
            <div className={ToolHistoryPageStyles.button}>
            <button onClick={() => OpenForm()}>
              {"Create New Tool"}
          </button>
            </div>
                <ToolInfoATable />
            </main>
    </div>
  );
};
  
export default ToolHistoryPage;
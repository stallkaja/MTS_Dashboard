
import React from 'react';
import ToolInfoATable from '../components/ToolinfoATable';
import { useNavigate, Link } from 'react-router';
import 'C:/Users/osterjo/Documents/DOS_Site/FE/src/App.css';

  
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
            <h1 style={{ textAlign: "center" }}>Calibrated Tool Information Page</h1>
            
            
            <button onClick={() => OpenForm()}>
              {"Create New Tool"}
          </button>
           
          <ToolInfoATable/>
            
    </div>
  );
};
  
export default ToolHistoryPage;

import React from 'react';
import ToolInfoATable from '../components/ToolinfoATable';
import { useNavigate, Link } from 'react-router';


  
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
    <div
      /*style={{
        display: 'flex',
        justifyContent: 'Center',
        alignItems: 'Right',
        height: '100vh'
      }}*/
    >
          <h1>Calibrated Tool Information Page</h1>
          <button onClick={() => OpenForm()}>
              {"Create New Tool"}
          </button>


          <ToolInfoATable/>
    </div>
  );
};
  
export default ToolHistoryPage;

import React from 'react';
import ToolInfoATable from '../components/ToolinfoATable';
import { useNavigate, Link } from 'react-router';
  
const ToolHistoryPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'Center',
        alignItems: 'Right',
        height: '100vh'
      }}
    >
          <h1>Tool Information Page</h1>
          <ToolInfoATable/>
    </div>
  );
};
  
export default ToolHistoryPage;
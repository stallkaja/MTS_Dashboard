import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import InventoryATable from '../components/InventoryATable';
import { Button, Space, ConfigProvider } from 'antd';
import './MaterialListPage.css';

const HomePage = ({ setItemToEdit }) =>{
const navigate = useNavigate();
const [items, setItems] = useState([]);
const [headers, setHeaders] = useState([]);
const OpenForm = () => {
  let path = '/createMaterial';
  navigate (path);
}



  return (
      <>
          <ConfigProvider
              theme={{
                  token: {
                      colorPrimary: '#ffffff',
                      colorTextLightSolid: '#000000',
                      colorBorder: '#242437',
                      colorPrimaryHover: '#e0ded6'
                  },
              }}>
              <div id='MateTitleCard'>
                  <h1 id='MaterialText'>DOS Material List</h1>
              </div>
    <div id='MaterialCard'>
        
      <div id='MaterialButton'>
        <Button type="primary" onClick={() => OpenForm()}>
          {"Create Item"}
        </Button>
      </div>
    </div>
      <InventoryATable/>
      {/* <ItemTable headers ={headers} items={items} onEdit={onEdit} onDelete={onDelete}/> */}
      <br/>
		
      </ConfigProvider>
    </>
  )
}
export default HomePage;
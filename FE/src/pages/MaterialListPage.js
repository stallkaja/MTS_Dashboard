import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ItemTable from '../components/ItemTable';
import InventoryATable from '../components/InventoryATable';
import { Button, Space } from 'antd';

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
    
      <h1 style={{textAlign: 'left'} }>DOS Material List</h1>
          <Button type="primary" onClick={() => OpenForm()}>
            {"Create Item"}
          </Button>
      <InventoryATable/>
      {/* <ItemTable headers ={headers} items={items} onEdit={onEdit} onDelete={onDelete}/> */}
      <br/>
		
      
    </>
  )
}
export default HomePage;
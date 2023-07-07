import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ItemTable from '../components/ItemTable';
import InventoryATable from '../components/InventoryATable';

const HomePage = ({ setItemToEdit }) =>{
const navigate = useNavigate();
const [items, setItems] = useState([]);
const [headers, setHeaders] = useState([]);




  return (
    <>
    
          <h1 style={{textAlign: 'left'} }>DOS Material List</h1>
      <h2 style={{color: "white"}}><Link to='/createMaterial'>Create an Item</Link></h2>
      <InventoryATable/>
      {/* <ItemTable headers ={headers} items={items} onEdit={onEdit} onDelete={onDelete}/> */}
      <br/>
		
      
    </>
  )
}
export default HomePage;
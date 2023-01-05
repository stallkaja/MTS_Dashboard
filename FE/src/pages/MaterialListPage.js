import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ItemTable from '../components/ItemTable';

const HomePage = ({ setItemToEdit }) =>{
const navigate = useNavigate();
const [items, setItems] = useState([]);

const loadItems = async () => {
    const response = await fetch('/items');
    const data = await response.json();
    setItems(data);
  }

useEffect(() =>  loadItems(), []);

const [headers, setHeaders] = useState([]);
const loadHeaders = async () => {
  const response = await fetch('/headers');
  const headersData = await response.json();

  setHeaders(headersData);
}
useEffect(()=> loadHeaders(),[]);


//WIP this does not work because it is code from my old project that was deleting by an ID number, our database does not have an ID number so the delete fails
const onDelete = async PK => {
    // Make a DELETE request
    //console.log(PK)
    const response = await fetch(`/exercises/${PK}`, {method: 'DELETE'});
    if (response.status === 204) {
      setItems(items.filter(e => e.PK !== PK));
      document.location.reload ();
    } else {
      console.error(`Failed to delete exercise with _id ${PK} with status \
        code = ${response.status}`)
    }
};


//WIP this does not work either because it uses this setExerciseToEdit which is 
const onEdit = item => {
    console.log(item)
    console.log(setItemToEdit)
    setItemToEdit(item);
    navigate('/edit');
  };

  return (
    <>
    
      <h1>DOS Material List</h1>
      <h2 style={{color: "white"}}><Link to='/create'>Create an Item</Link></h2>
      <ItemTable headers ={headers} items={items} onEdit={onEdit} onDelete={onDelete}/>

      <br/>
		
      
    </>
  )
}
export default HomePage;
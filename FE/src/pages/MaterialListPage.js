import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ItemTable from '../components/ItemTable';

const HomePage = ({ setExerciseToEdit }) =>{
const history = useNavigate();
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

const onEdit = exercise => {
    setExerciseToEdit(exercise);
    history.push('/edit');
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
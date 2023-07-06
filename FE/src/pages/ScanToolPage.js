import React from 'react';
import ScanToolStyles from './ScanTool.module.css' 
import ItemTable from '../components/ItemTable';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ScanHistoryATable from '../components/ScanHistoryATable';
import {Table} from 'antd'


const ScanToolPage = ({ setItemToEdit }) => {
    const [newLoc, setLoc] = useState('');
    const [nvl, setNvl] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [searchnvl, setSearchNvl] = useState('');
    const history = useNavigate();
    const [headers, setHeaders] = useState([]);
    
    const [toolHistory, setToolHistory] = useState([
      {NVL: '',
    tool: 'ad'}
    ]);

    const loadToolHistory = async () => {
        const response = await fetch('/toolhistory');
        const data = await response.json();
        setToolHistory(data);
        console.log(toolHistory)
      }

    //useEffect(() => searchNVL(), []);
    //----------------------------------------------------------------------------
    // Make a POST request to create a new scan record
    //----------------------------------------------------------------------------
    const newScan = async () => {
        // Create new object with the variables set in the form
        let yourDate = new Date()
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset*60*1000))
        const date = yourDate.toISOString().split('T')[0]
        const newScan = { nvl, employeeID, newLoc, date };
        console.log(date)
        console.log(newScan)
        const response = await fetch('/newScan', {
            method: 'POST',
            body: JSON.stringify(newScan),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response =>{
          if (response.status === 200) {
              alert("Scan has been added!");
          } else {
              alert(`Failed to add scan, status code = ${response.status}`);
          }
        });

        // Return to home page
        window.location.reload(true)
    }



    //WIP, this does not currently work because it is my old code from class and it tries to delete by ID, we dont necessairly
    //have IDs on all the cables so this will probably fail. 
    const onDelete = async PK => {
      // Make a DELETE request
      //console.log(PK)
      const response = await fetch(`/exercises/${PK}`, {method: 'DELETE'});
      if (response.status === 204) {
        setToolHistory(toolHistory.filter(e => e.PK !== PK));
        document.location.reload ();
      } else {
        console.error(`Failed to delete exercise with _id ${PK} with status \
          code = ${response.status}`)
      }
  };
  
  const onEdit = item => {
    setItemToEdit(item);
    history.push('/edit');
  };


  return (
    <div>
        <h1>Calibrated Tool Movement Log</h1>
        <div className={ScanToolStyles.row}>
            <div className={ScanToolStyles.column}>
                <h2>Scan Tool</h2>
                <fieldset>
                  <label for="nvl">NVL #</label>
                    <input id="nvl"
                      type="text"
                      value={nvl}
                      onChange={e => setNvl(e.target.value)}
                  /> <br/>
                   <label for="employeeID">Employee ID #</label>
                    <input id="employeeID"
                      type="text"
                      value={employeeID}
                      onChange={e => setEmployeeID(e.target.value)}
                  /> <br/>
                   <label for="newLoc">New Location</label>
                    <input id="newLoc"
                      type="text"
                      value={newLoc}
                      onChange={e => setLoc(e.target.value)}
                  /> <br/>
			            <button onClick={newScan}> Submit </button>
                </fieldset>
            </div>
            <div className={ScanToolStyles.column}>
{/*                   <button onClick={searchNVL}> Submit </button>
                  <br/>
                  <ItemTable headers ={headers} items={toolHistory} onEdit={onEdit} onDelete={onDelete}/> */}
                  <ScanHistoryATable/>
            </div>
            {/* <Table dataSource={toolHistory} columns={columns} /> */}
        </div>
    </div>
    
    
  );
};
  
export default ScanToolPage;



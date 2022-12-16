import React from 'react';
import ScanToolStyles from './ScanTool.module.css' 
import ToolHistoryTable from '../components/ToolHistoryTable';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';



const ScanToolPage = () => {
    const [newLoc, setLoc] = useState('');
    const [nvl, setNvl] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [searchnvl, setSearchNvl] = useState('');
    const history = useNavigate();
    const [toolhistory, setToolHistory] = useState('')
    /*     const history = useNavigate();
        const [ToolHistory, setToolHistory] = useState([]);
        
        const loadToolHistory = async () => {
            const response = await fetch('/ToolHistory');
            const data = await response.json();
            setToolHistory(data);
          }
        
        useEffect(() =>  loadToolHistory(), []); */

    //----------------------------------------------------------------------------
    // Make a POST request to create a new scan record
    //----------------------------------------------------------------------------
    const newScan = async () => {
        // Create new object with the variables set in the form
        const newScan = { nvl, employeeID, newLoc };
        console.log("new scan")
        const response = await fetch('/newScan', {
            method: 'POST',
            body: JSON.stringify(newScan),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 201) {
                alert("Scan has been added!");
            } else {
                alert(`Failed to add scan, status code = ${response.status}`);
            }
        });

        if (response.status === 201) {
            alert("Scan has been added!");
        } else {
            alert(`Failed to add scan, status code = ${response.status}`);
        }
        // Return to home page
        console.log("trying to reload the page")
        window.location.reload(true)
    }
    const loadToolHistory = async () => {
        const response = await fetch('/toolhistory');
        const data = await response.json();
        setToolHistory(data);
    }
const handleSubmitClicked = () => {
       var elem = document.getElementById("NVL");
       console.log(elem)
    }
    var ToolHistory={};
  return (
    <div>
        <h1>Tool Scan Page</h1>
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
                  <h2>History</h2>
                  <label for="searchnvl">Search NVL History</label>
                  <input id="searchnvl"
                      type="text"
                      value={searchnvl}
                      onInput={e => setSearchNvl(e.target.value)}
                      placeholder="Search an NVL"
                  /> <br/>
                  <ToolHistoryTable items={ToolHistory} /> 

            </div>
        </div>
    </div>
    
    
  );
};
  
export default ScanToolPage;



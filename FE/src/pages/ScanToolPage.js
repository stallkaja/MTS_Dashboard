import React from 'react';
import ScanToolStyles from './ScanTool.module.css' 
import ToolHistoryTable from '../components/ToolHistoryTable';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';



const ScanToolPage = () => {
/*     const history = useNavigate();
    const [ToolHistory, setToolHistory] = useState([]);
    
    const loadToolHistory = async () => {
        const response = await fetch('/ToolHistory');
        const data = await response.json();
        setToolHistory(data);
      }
    
    useEffect(() =>  loadToolHistory(), []); */
    
    
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
                <form>
                    <label>NVL:</label>
                    <input type="text" className="test" id="NVL" value="NVL"></input><br></br>
                    <label>Name:</label>
                    <input type="text" id="empName" value="Name"></input><br></br>
                    <label>New Loc:</label>
                    <input type="text" id="newLoc" value="Location"></input><br></br>
                    <button onClick={handleSubmitClicked(this)}>Submit</button>
                </form>
            </div>
            <div className={ScanToolStyles.column}>
                <h2>History</h2>
                 <ToolHistoryTable items={ToolHistory}/> 
            </div>
        </div>
    </div>
    
    
  );
};
  
export default ScanToolPage;



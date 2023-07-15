import React from 'react';
import ScanToolStyles from './ScanTool.module.css' 
import ItemTable from '../components/ItemTable';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ScanHistoryATable from '../components/ScanHistoryATable';
import {Table, ConfigProvider} from 'antd'
import { Button} from 'antd';

const ScanToolPage = ({ setItemToEdit }) => {
    const [newLoc, setLoc] = useState('');
    const [nvl, setNvl] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [searchnvl, setSearchNvl] = useState('');
    const history = useNavigate();
    const [headers, setHeaders] = useState([]);
    const [searchNVL, setSearchNVL] = useState('');
    
    const [toolHistory, setToolHistory] = useState([
      {NVL: '',
    tool: 'ad'}
    ]);


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
        const time = (yourDate.toISOString().split('T')[1]).split('.')[0]
        const dateTime = date + ' ' + time;

        const newScan = { nvl, employeeID, newLoc, dateTime };
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
    const fetchNVLs = async () => {
        const targetNVL = { searchNVL }
        const response = await fetch('/searchNVL', {
            method: 'POST',
            body: JSON.stringify(targetNVL),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                response.json().then((responseData) => {
                    for(let i =0; i<responseData.length;i++){
                        let cleanDate = (responseData[i].curDate.split('T')[0]) + ' ' + ((responseData[i].curDate.split('T')[1]).split('.')[0])
                        responseData[i].curDate = cleanDate
                    }
                    setToolHistory(responseData)
                })
            }
        });
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ffffff',
                    colorTextLightSolid: '#000000',
                    colorBorder: '#000000',
                    //lineType: 'default',
                    //lineWidth: '1',
                    colorPrimaryHover: '#e0ded6'
                },
            }}>
      <div>
          <div className={ScanToolStyles.titlecard}>
              <h1 className={ScanToolStyles.headtext2}>Calibrated Tool History</h1>
          </div>
                <div className={ScanToolStyles.header}>
                    <div className={ScanToolStyles.headtext }>Movement Log</div>
                    {/*<label for="searchnvl">Search NVL History</label>*/}
                    <div className={ScanToolStyles.searchbar }>
                        <input id="searchnvl"
                            type="text"
                            value={searchNVL}
                            onInput={e => setSearchNVL(e.target.value)}
                            placeholder="Search an NVL"
                            size="25"
                        />

                        <div className={ScanToolStyles.searchbutton }>
                            <Button type="default" onClick={fetchNVLs}>Search</Button></div>
                            </div>
                    <br /></div>

                    {/*<h2 style={{ textAlign: "center" }}>Scan Tool</h2>*/}
                    <fieldbox>
                        <fieldset>
                            <legend>
                            Tool Movement Form</legend>
                        
                        <label for="nvl">NVL #</label>
                            <input id="nvl"
                                type="text"
                                value={nvl}
                                onChange={e => setNvl(e.target.value)}
                            /> <br />
                            <label for="employeeID">Employee ID #</label>
                            <input id="employeeID"
                                type="text"
                                value={employeeID}
                                onChange={e => setEmployeeID(e.target.value)}
                            /> <br />
                            <label for="newLoc">New Location</label>
                            <input id="newLoc"
                                type="text"
                                value={newLoc}
                                onChange={e => setLoc(e.target.value)}
                            /> <br />
                            <div className={ScanToolStyles.buttonmove}>
                                <Button type="default" onClick={newScan}> Save </Button>
                            </div>
                        </fieldset>
                    </fieldbox> 
          
        <div className={ScanToolStyles.row}>
                    {/*<div className={ScanToolStyles.column}>
                        <h2 style={{ textAlign: "center" }}>Scan Tool</h2>
                        <fieldbox>
                            <fieldset>
                                <legend>                                  
                                        Tool Movement Form</legend>
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
                            /> <br />
                            <div className={ScanToolStyles.buttonmove}>
                                <Button type="default" onClick={newScan}> Save </Button>
                        </div>
                            </fieldset>
                </fieldbox>
            </div>*/}
            <div className={ScanToolStyles.column}>
{/*                   <button onClick={searchNVL}> Submit </button>
                  <br/>
                  <ItemTable headers ={headers} items={toolHistory} onEdit={onEdit} onDelete={onDelete}/> */}
                        {/*<ScanHistoryATable/>*/}
                        <ScanHistoryATable
                            toolHistory={toolHistory} />
            </div>
                    {/* <Table dataSource={toolHistory} columns={columns} /> */}
        </div>
            </div>
    </ConfigProvider>
    
    
  );
};
  
export default ScanToolPage;



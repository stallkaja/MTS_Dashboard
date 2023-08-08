import {Table} from 'antd';
import { useState, useEffect } from 'react';


function ScanHistoryATable({toolHistory }){
    //const [searchNVL, setSearchNVL] = useState('');
    const [headers, setHeaders] = useState([]);
    const [hideList, setHideList] = useState(['PK'])
    //const [toolHistory, setToolHistory] = useState([]);

    const loadHeaders = async () => {
    const tName = 'toolhistorytable'
    const tableName = {tName}
    const response = await fetch('/headers', {
      method: 'POST',
      body: JSON.stringify(tableName),
      headers: {
          'Content-Type': 'application/json'
      }

  }).then((response) => {
    if (response.ok) {
      response.json().then((responseData) => {
        const headerArray=[];
        for(let i =0;i<responseData.length;i++){
          let payload = {};
          if(hideList.includes(responseData[i].COLUMN_NAME)){
            payload = {
            title: responseData[i].COLUMN_NAME,
            dataIndex: responseData[i].COLUMN_NAME,
            key: responseData[i].COLUMN_NAME,
            hidden: true
            }
          }
          else{
            payload = {
              title: responseData[i].COLUMN_NAME,
              dataIndex: responseData[i].COLUMN_NAME,
              key: responseData[i].COLUMN_NAME,
            }
          }

            headerArray.push(payload)
        }
        setHeaders(headerArray)
      })
    }
  });
}
useEffect(()=> loadHeaders(),[]);

    /*const fetchNVLs = async () => {
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
          setToolHistory(responseData)
          console.log(toolHistory)
        })
      }
    });
}*/
    return(
        <div>
            {/*<h2 style={{textAlign: "center"} }>Movement Log</h2>
            <label for="searchnvl">Search NVL History</label>
            <div style={{display: "flex"} }>
            <input id="searchnvl"
                type="text"
                value={searchNVL}
                onInput={e => setSearchNVL(e.target.value)}
                placeholder="Search an NVL"
            />
            <div style={{paddingLeft: "5px"} }>
            <Button type="default" onClick={fetchNVLs}>Search</Button></div></div>
            <br/>*/}
            <Table columns={headers.filter(item => !item.hidden)} dataSource={toolHistory} />
        </div>

    );
}
export default ScanHistoryATable;
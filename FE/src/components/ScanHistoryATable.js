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
          else if (responseData[i].COLUMN_NAME == "employeeID") {
              payload = {
                  title: "Employee ID",
                  dataIndex: responseData[i].COLUMN_NAME,
                  key: responseData[i].COLUMN_NAME 
              }
          }
          else if (responseData[i].COLUMN_NAME == "newLoc") {
              payload = {
                  title: "Scanned Location",
                  dataIndex: responseData[i].COLUMN_NAME,
                  key: responseData[i].COLUMN_NAME
              }
          }
          else if (responseData[i].COLUMN_NAME == "curDate") {
              payload = {
                  title: "Scanned Date",
                  dataIndex: responseData[i].COLUMN_NAME,
                  key: responseData[i].COLUMN_NAME
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

    return(
        <div>
            <Table className='OpenTicketTable' columns={headers.filter(item => !item.hidden)} dataSource={toolHistory} />
        </div>

    );
}
export default ScanHistoryATable;
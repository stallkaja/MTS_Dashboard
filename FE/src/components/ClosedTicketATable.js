import {Button, Space, Table, Tag } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);



function ClosedTicketATable(targetNVL){
  const [items, setItems] = useState([]);
  const [headers, setHeaders] = useState([]);
    const navigate = useNavigate();

  const EditRecord=(record)=>{
    navigate('/ticketPage',{state:{record:record}});
  };

  const loadHeaders = async () => {
  const tName = 'ticketstable'
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

            if(responseData[i].COLUMN_NAME == "TicketNum"){
              var payload = {
                title: responseData[i].COLUMN_NAME,
                dataIndex: responseData[i].COLUMN_NAME,
                key: responseData[i].COLUMN_NAME,
                sorter: (a, b) => a.TicketNum - b.TicketNum,
              }
            }
            else{
              var payload = {
                title: responseData[i].COLUMN_NAME,
                dataIndex: responseData[i].COLUMN_NAME,
                key: responseData[i].COLUMN_NAME,
              }
            }

            headerArray.push(payload)
        }
        const buttonPayload = {
          title: 'Do it',
          key: 'key',
          dataIndex: 'key',
          render: (text, record) => (
              <Button style={{ backgroundColor: '#00a800', color: '#000000', borderColor: '#ffffff' }} onClick={()=>EditRecord(record)}>
            {/* <div> <a onClick={()=>{toComponentB()}}>Component B<a/></div> */}
             {"Open"}
           </Button>
          ),
        }
          headerArray.push(buttonPayload)
        setHeaders(headerArray)
      })
    }
  });
}
useEffect(()=> loadHeaders(),[]);

const loadItems = async () => {
  const response = await fetch('/loadClosedTickets', {
      headers: {
          'Content-Type': 'application/json'
      }

  }).then((response) => {
    if (response.ok) {
      response.json().then((responseData) => {
          for (let i = 0; i < responseData.length; i++) {
              let cleanDate = (dayjs(responseData[i].OpenDate).tz("America/Los_Angeles").format('YYYY-MM-DD HH:mm:ss'))
              responseData[i].OpenDate = cleanDate

              let cleanDate2 = (dayjs(responseData[i].ProgDate).tz("America/Los_Angeles").format('YYYY-MM-DD HH:mm:ss'))
              responseData[i].ProgDate = cleanDate2

              let cleanDate3 = (dayjs(responseData[i].CloseDate).tz("America/Los_Angeles").format('YYYY-MM-DD HH:mm:ss'))
              responseData[i].CloseDate = cleanDate3
          }
        setItems(responseData)
      })
    }
  });
}
useEffect(() =>  loadItems(), []);
    return(
        <Table
          className="OpenTicketTable"
          columns={headers}
          dataSource={items}
          bordered
        />
    );
}
export default ClosedTicketATable;
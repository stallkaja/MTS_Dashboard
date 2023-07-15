import {Button, Space, Table, Tag } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';

//Example code from antD. 
/* const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]; */

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
        setItems(responseData)
      })
    }
  });
}
useEffect(() =>  loadItems(), []);
    return(
        <Table
          className="ClosedTicketTable"
          columns={headers}
          dataSource={items}
          bordered
        />
    );
}
export default ClosedTicketATable;
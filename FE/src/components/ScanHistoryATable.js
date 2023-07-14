import {Button, Space, Table, Tag } from 'antd';
import { useState, useEffect } from 'react';
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

function ScanHistoryATable(){
    const [searchNVL, setSearchNVL] = useState('');
    const [headers, setHeaders] = useState([]);
    const [toolHistory, setToolHistory] = useState([]);
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
        //console.log(responseData)
        for(let i =0;i<responseData.length;i++){

            // console.log(responseData[i].COLUMN_NAME)
            let payload = {
              title: responseData[i].COLUMN_NAME,
              dataIndex: responseData[i].COLUMN_NAME,
              key: responseData[i].COLUMN_NAME,
            }
            headerArray.push(payload)
        }
        setHeaders(headerArray)
      })
    }
  });
}
useEffect(()=> loadHeaders(),[]);

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
          setToolHistory(responseData)
          console.log(toolHistory)
        })
      }
    });
}
    return(
        <div>
            <h2 style={{textAlign: "center"} }>History</h2>
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
            <br/>
            <Table columns={headers} dataSource={toolHistory} />
        </div>

    );
}
export default ScanHistoryATable;
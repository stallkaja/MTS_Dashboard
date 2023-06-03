import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag, Typography } from 'antd';
import { useState, useEffect, useRef } from 'react';
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

function InventoryATable(targetNVL){
  //Sort method to sort numbers and strings without having to determine type in column
  const defaultSort = (a, b) => {
    if (a < b) return -1;
    if (b < a) return 1;
    return 0;
  };
  
  //Methods for search and sort in columns -----------------------
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  //---------------------------------------------------


  const [items, setItems] = useState([]);
  const [headers, setHeaders] = useState([]);
    const loadHeaders = async () => {
  //const tName = 'materialListtable'
        const tableName = {tName: 'materialListtable'}
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

          console.log(responseData[i].COLUMN_NAME)
          if(responseData[i].COLUMN_NAME == "MaterialName"){
            var payload = {
              title: responseData[i].COLUMN_NAME,
              dataIndex: responseData[i].COLUMN_NAME,
              key: responseData[i].COLUMN_NAME,
              sorter: (a, b) => a.MaterialName.localeCompare(b.MaterialName),
              sortDirections: ['ascend', 'descend'],
            }
          }
          else if(responseData[i].COLUMN_NAME == "BEN"){
            var payload = {
              title: responseData[i].COLUMN_NAME,
              dataIndex: responseData[i].COLUMN_NAME,
              key: responseData[i].COLUMN_NAME,
              ...getColumnSearchProps('BEN'),
              sorter: (a, b) => a.BEN.localeCompare(b.BEN),
              sortDirections: ['descend', 'ascend'],
              width: '30%',
            }
          }
          else{
            var payload = {
              title: responseData[i].COLUMN_NAME,
              dataIndex: responseData[i].COLUMN_NAME,
              key: responseData[i].COLUMN_NAME,
              sorter: {
                compare: (a, b) => defaultSort(a[responseData[i].COLUMN_NAME], b[responseData[i].COLUMN_NAME]),
              },
              
              sortDirections: ['ascend', 'descend'],
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

const loadItems = async () => {
  const response = await fetch('/items', {
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
        <Table columns={headers} dataSource={items} />
    );
}
export default InventoryATable;
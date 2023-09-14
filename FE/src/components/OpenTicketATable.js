import React from 'react';
import {Button, Space, Table, Input, configProvider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { green } from '@mui/material/colors';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);



function OpenTicketATable(targetNVL){
    const [items, setItems] = useState([]);
    const [headers, setHeaders] = useState([]);
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const EditRecord=(record)=>{
      navigate('/ticketPage',{state:{record:record}});
    };

    //handling search and sort, copied from Ant Design
    const defaultSort = (a, b) => {
        if (a < b) return -1;
        if (b < a) return 1;
        return 0;
    };
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


    const loadHeaders = async () => {
    const tName = 'ticketstable'
    const tableName = { tName }
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
                        ...getColumnSearchProps(responseData[i].COLUMN_NAME),
                        sorter: {
                            compare: (a, b) => defaultSort(a.TicketNum - b.TicketNum)
                        },
                        sortDirections: ['descend', 'ascend'],
                        onCell: () => {
                        return {
                            style: {

                                maxWidth: 700,
                           }
                        }
                        },
                }
            }
            else{
                var payload = {
                    title: responseData[i].COLUMN_NAME,
                    dataIndex: responseData[i].COLUMN_NAME,
                    key: responseData[i].COLUMN_NAME,
                    ...getColumnSearchProps(responseData[i].COLUMN_NAME),
                    sorter: {
                        compare: (a, b) => defaultSort(a[responseData[i].COLUMN_NAME], b[responseData[i].COLUMN_NAME])
                    },
                    sortDirections: ['descend', 'ascend'],
                    onCell: () => {
                        return {
                            style: {

                                maxWidth: 700,
                            }
                        }
                    },              
                    }
                }

                headerArray.push(payload)
            }
            const buttonPayload = {
                title: 'Open Ticket',
                key: 'key',
                dataIndex: 'key',
                render: (text, record) => (

                    <Button style={{ backgroundColor: 'red', color: '#ffffff', borderColor: '#ffffff' }} onClick={()=>EditRecord(record)}>
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
        const response = await fetch('/loadOpenTickets', {
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
            style={{
                paddingTop: '10px',
            } }
        />
    );
}
export default OpenTicketATable;
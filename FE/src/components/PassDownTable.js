import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag, Typography } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router';

function PassDownTable({ hideArray, tableDataCallBack }) {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [hideList, setHideList] = useState(['PK'])
    const navigate = useNavigate();
    const [filtHead, setFiltHead] = useState([]);

    //navigation to passdown form and pulling record from table to populate form
    const EditRecord = (record) => {
        navigate('/PassdownForm', {state:{record:record}});
    };


    //Methods for search and sort in columns -----------------------
    //Sort method to sort numbers and strings without having to determine type in column
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
                            background: "#20A785",
                            borderColor: "#242437",
                            color: "#ffffff",
                            width: 90,
                        }}
                    >
                        Search
                    </Button>

                    <Button
                        type="primary"
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Close
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

    //retreiving items from DB
    const [items, setItems] = useState([]);
    const [headers, setHeaders] = useState([]);
    const loadHeaders = async () => {
        //const tName = 'materialListtable'
        const tableName = { tName: 'passdowntable' }
        const response = await fetch('/headers', {
            method: 'POST',
            body: JSON.stringify(tableName),
            headers: {
                'Content-Type': 'application/json'
            }

        }).then((response) => {
            if (response.ok) {
                response.json().then((responseData) => {
                    const headerArray = [];
                    for (let i = 0; i < responseData.length; i++) {

                        if(hideList.includes(responseData[i].COLUMN_NAME)){
                            var payload = {
                                title: responseData[i].COLUMN_NAME,
                                dataIndex: responseData[i].COLUMN_NAME,
                                key: responseData[i].COLUMN_NAME,
                                hidden: true
                            }
                        }
                        else if (responseData[i].COLUMN_NAME == "Date") {
                            var payload = {
                                title: responseData[i].COLUMN_NAME,
                                dataIndex: responseData[i].COLUMN_NAME,
                                key: responseData[i].COLUMN_NAME,
                                ...getColumnSearchProps(responseData[i].COLUMN_NAME),
                                sorter: (a, b) => a.Date.localeCompare(b.Date),
                                sortDirections: ['ascend', 'descend'],
                            }
                        }
                        else if (responseData[i].COLUMN_NAME == "Shift") {
                            var payload = {
                                title: responseData[i].COLUMN_NAME,
                                dataIndex: responseData[i].COLUMN_NAME,
                                key: responseData[i].COLUMN_NAME,
                                ...getColumnSearchProps(responseData[i].COLUMN_NAME),
                                sorter: (a, b) => a.Shift.localeCompare(b.Shift),
                                sortDirections: ['descend', 'ascend'],
                                width: '5%',
                            }
                        }
                        else {
                            var payload = {
                                title: responseData[i].COLUMN_NAME,
                                dataIndex: responseData[i].COLUMN_NAME,
                                key: responseData[i].COLUMN_NAME,
                                ...getColumnSearchProps(responseData[i].COLUMN_NAME),
                                sorter: {
                                    compare: (a, b) => defaultSort(a[responseData[i].COLUMN_NAME], b[responseData[i].COLUMN_NAME]),
                                },

                                sortDirections: ['ascend', 'descend'],
                                onCell: () => {
                                    return {
                                        style: {
                                            maxWidth: 900,
                                        }
                                    }
                                }
                            }
                        }

                        headerArray.push(payload)
                    }
                    const buttonPayload = {
                        title: 'Open',
                        key: 'key',
                        dataIndex: 'key',
                        render: (text, record) => (
                            <Button onClick={() => EditRecord(record)}>
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
    useEffect(() => loadHeaders(), []);

    //retreiving items from DB
    const loadItems = async () => {
        const response = await fetch('/passdowns', {
            headers: {
                'Content-Type': 'application/json'
            }

        }).then((response) => {
            if (response.ok) {
                response.json().then((responseData) => {
                    
                    for (let i = 0; i < responseData.length; i++) {
                        let cleanDate = (responseData[i].Date.split('T')[0])
                        responseData[i].Date = cleanDate
                    }
                    setItems(responseData)
                    tableDataCallBack(responseData)
                })
            }
        });
    }
    useEffect(() => loadItems(), []);
    //assigning hidden columns
    const columnHide = (hideArray, headers) => {
        let localHideList = []
        if (hideArray !== undefined) {
            for (let i = 0; i < hideArray.length; i++) {
                localHideList.push(hideArray[i])
            }
            let addHeader = []
            for (let i = 0; i < headers.length; i++) {
                let payload = {}
                if (localHideList.includes(headers[i].title)) {
                    payload = {
                        title: headers[i].title,
                        dataIndex: headers[i].dataIndex,
                        key: headers[i].key,
                        hidden: true
                    }
                } else if (headers[i].title === "Open") {
                    payload = {
                        title: 'Open',
                        key: 'key',
                        dataIndex: 'key',
                        render: (text, record) => (
                            <Button onClick={() => EditRecord(record)}>
                                {"Open"}
                            </Button>
                        )
                    }
                } else {
                    payload = {
                        title: headers[i].title,
                        dataIndex: headers[i].dataIndex,
                        key: headers[i].key,
                        hidden: false,
                        ...getColumnSearchProps(headers[i].title),
                        sorter: {
                            compare: (a, b) => defaultSort(a[headers[i].title], b[headers[i].title])
                        },
                        sortDirections: ['descend', 'ascend'],
                        onCell: () => {
                            return {
                                style: {
                                    maxWidth: 900,
                                }
                            }
                        }
                    }
                }
                addHeader.push(payload)
            }
            setHeaders(addHeader)
        }
    }
    useEffect(() => {
        columnHide(hideArray, headers)
    }, [hideArray])

    useEffect(() => {
        let filt = []
        filt = (
            headers.filter(item => !item.hidden)
        )
        setFiltHead([...filt])
    }, [headers])

    return (

        <Table 
            className='OpenTicketTable'
            columns={filtHead}
            dataSource={items}
            style={{
                paddingTop: '10px',
            }} 
        />
    );
}
export default PassDownTable;
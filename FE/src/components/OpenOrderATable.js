import { Button, Space, Input, Table, Switch, Tag, ConfigProvider, Select, message } from 'antd';
import { green } from '@mui/material/colors';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router';
import { SearchOutlined } from '@ant-design/icons';



function OpenOrderATable({ hideArray, searchResults }) {
    const [items, setItems] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const navigate = useNavigate();
    const [hideList, setHideList] = useState([
        'Email',
        'PreferredVendor',
        'PurchNumber',
        'AdminComments',
        'AttachFile'
    ])
    const [lines, setLines] = useState([]);
    const [lineHeads, setLineHeads] = useState([]);
    const [lineHide, setLineHide] = useState([
        'PK',
        'RequestNumber'
    ])

    const [filtHead, setFiltHead] = useState([]);
    const EditRecord = (record) => {
        console.log(record)
        navigate('/MaterialRequestform', { state: { record: record } })
    };

    //search and sort handlers, copied from Ant Design
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

    //requesting headers from DB
    const loadHeaders = async () => {
        const tName = 'materialorderstable'
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
                    const headerArray = [];
                    for (let i = 0; i < responseData.length; i++) {
                        let payload = {};
                        if (hideList.includes(responseData[i].COLUMN_NAME)) {
                            payload = {
                                title: responseData[i].COLUMN_NAME,
                                dataIndex: responseData[i].COLUMN_NAME,
                                key: responseData[i].COLUMN_NAME,
                                hidden: true
                            }
                        }
                        else {
                            payload = {
                                title: responseData[i].COLUMN_NAME,
                                dataIndex: responseData[i].COLUMN_NAME,
                                key: responseData[i].COLUMN_NAME,
                                ...getColumnSearchProps(responseData[i].COLUMN_NAME),
                                sorter: {
                                    compare: (a, b) => defaultSort(a[responseData[i].COLUMN_NAME], b[responseData[i].COLUMN_NAME]),
                                },
                                sortDirections: ['descend', 'ascend'],
                            }
                        }

                            headerArray.push(payload)                        
                    }

                        const buttonPayload = {
                            title: 'Edit Record',
                            key: 'key',
                            dataIndex: 'key',
                            render: (text, record) => (

                                <Button style={{ color: '#000000', borderColor: '#000000' }} onClick={() => EditRecord(record)}>

                                    {"Edit"}
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

    const loadLineHeaders = async () => {
        const tName = 'orderlineitemstable'
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
                    const headerArray2 = [];
                    for (let i = 0; i < responseData.length; i++) {
                        let payload2 = {};
                        if (lineHide.includes(responseData[i].COLUMN_NAME)) {
                            payload2 = {
                                title: responseData[i].COLUMN_NAME,
                                dataIndex: responseData[i].COLUMN_NAME,
                                key: responseData[i].COLUMN_NAME,
                                hidden: true
                            }
                        }
                        else {
                            payload2 = {
                                title: responseData[i].COLUMN_NAME,
                                dataIndex: responseData[i].COLUMN_NAME,
                                key: responseData[i].COLUMN_NAME,
                                ...getColumnSearchProps(responseData[i].COLUMN_NAME),
                                sorter: {
                                    compare: (a, b) => defaultSort(a[responseData[i].COLUMN_NAME], b[responseData[i].COLUMN_NAME]),
                                },
                                sortDirections: ['descend', 'ascend'],
                            }
                        }

                        headerArray2.push(payload2)
                    }

                    setLineHeads(headerArray2)

                })
            }
        });
    }
    useEffect(() => loadLineHeaders(), []);
    console.log(lineHeads)


    //requesting items from DB
    const loadItems = async () => {
        const response = await fetch('/loadOpenOrders', {
            headers: {
                'Content-Type': 'application/json'
            }

        }).then((response) => {
            if (response.ok) {
                response.json().then((responseData) => {
                    for (let i = 0; i < responseData.length; i++) {
                        if (responseData[i].NeedBy !== null) {
                            let cleanDate = (responseData[i].NeedBy.split('T')[0])
                            responseData[i].NeedBy = cleanDate
                        }
                        if (responseData[i].OpenDate !== null) {
                            let cleanDate = (responseData[i].OpenDate.split('T')[0])
                            responseData[i].OpenDate = cleanDate
                        }
                        if (responseData[i].SubmitDate !== null) {
                            let cleanDate = (responseData[i].SubmitDate.split('T')[0])
                            responseData[i].SubmitDate = cleanDate
                        }
                        if (responseData[i].ClosedDate !== null) {
                            let cleanDate = (responseData[i].ClosedDate.split('T')[0])
                            responseData[i].ClosedDate = cleanDate
                        }
                        responseData[i].key = (i+1).toString()

                    }
                    setItems(responseData)
                })
            }
        });


    }
    useEffect(() => loadItems(), []);

    const loadLineItems = async() => {
        const response = await fetch('/loadLineData', {
            headers: {
                'Content-Type': 'application/json'
            }

        }).then((response) => {
            if (response.ok) {
                response.json().then((responseData) => {
                    for (let i = 0; i < responseData.length; i++) {

                    }
                    setLines(responseData)
                })
            }
        });
    }
    useEffect(() => loadLineItems(), []);

    console.log(lines)
    console.log(items)

    //assigning hidden columns
    const columnHide = (hideArray, headers) => {
        let localHideList = []
        if (hideArray !== undefined) {
            for (let i = 0; i < hideArray.length; i++) {
                localHideList.push(hideArray[i])
            }

            //const localHideList = JSON.parse(hideArray.hideArray)
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
                } else if (headers[i].title === "Edit Record") {
                    payload = {
                        title: headers[i].title,
                        dataIndex: headers[i].dataIndex,
                        key: headers[i].key,
                        render: (text, record) => (
                            <Button style={{ color: '#000000', borderColor: '#000000' }} onClick={() => EditRecord(record)}>
                                {"Edit"}
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
                    }
                }
                addHeader.push(payload)
            }
            setHeaders(addHeader)
        }
    }
    useEffect(() => {
        columnHide(hideArray, headers)
    },[hideArray])

    useEffect(() => {
        let filt = []
        filt = (
            headers.filter(item => !item.hidden)
        )
        setFiltHead([...filt])
    },[headers])

    const dispResults = (searchResults, items) => {
        //console.log("hello there")
        //console.log(searchResults)
        if (searchResults !== undefined) {

            let searchTable = []
            for (let i = 0; i < searchResults.length; i++) {
                searchTable.push(searchResults[i])
            }

            for (let i = 0; i < searchTable.length; i++) {
                if (searchTable[i].NeedBy !== null) {
                    let cleanDate = (searchTable[i].NeedBy.split('T')[0])
                    searchTable[i].NeedBy = cleanDate
                }
                if (searchTable[i].OpenDate !== null) {
                    let cleanDate = (searchTable[i].OpenDate.split('T')[0])
                    searchTable[i].OpenDate = cleanDate
                }
                if (searchTable[i].SubmitDate !== null) {
                    let cleanDate = (searchTable[i].SubmitDate.split('T')[0])
                    searchTable[i].SubmitDate = cleanDate
                }
                if (searchTable[i].ClosedDate !== null) {
                    let cleanDate = (searchTable[i].ClosedDate.split('T')[0])
                    searchTable[i].ClosedDate = cleanDate
                }
            }



            setItems([...searchTable])
        }
        
    }

    useEffect(() => {
        dispResults(searchResults, items)
    },[searchResults])

    const expandedRowRender = (record) => {
        const data = [];
        let localCols = [];
        for (let i = 0; i < lineHeads.length; i ++){
            if((lineHeads[i].title !== "RequestNumber") && (lineHeads[i].title !== "PK")){
                localCols.push(lineHeads[i])
                console.log("I pushed" + lineHeads[i].title)
            }
        }
        //lines
        console.log("record here")
        console.log(record)
        for (let i = 0; i < lines.length; i ++) {
            if(record.RequestNumber == lines[i].RequestNumber){
                data.push(lines[i])
            }
        }
        console.log("localCols line heads here")
        console.log(localCols)
        return <Table
            columns={localCols}
            dataSource={data}
            bordered={false}
            showSorterTooltip={false}
                />;
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBg: '#000000',
                    }
                },
                token: {
                    //colorBgContainer: '#E6E3DC',
                }
            } }  
        >
            <Table
                className="OpenTicketTable"
                columns={filtHead}
                expandable={{
                    expandedRowRender,
                    defaultExpandedRowKeys: ['0'],
                  }}
                dataSource={items}
                bordered
                showSorterTooltip={false}
                style={{
                    
                }}
            />
        </ConfigProvider>
    );
}

export default OpenOrderATable;
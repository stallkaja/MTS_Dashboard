import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, message, Popconfirm } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router';


function InventoryATable(hideArray){
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [items, setItems] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [hideList, setHideList] = useState([
        'PK',
        'LaptopAssignedMF',
        'LaptopDepartment',
        'LaptopAssignedFEDShift',
        'LaptopAssignedFENShift',
        'LaptopAssignedBEDShift',
        'LaptopAssignedBENShift',
        'AdditionalNotes',
        'AssetNumber'])
    const [filtHead, setFiltHead] = useState([]);
    const searchInput = useRef(null);
    const navigate = useNavigate();
    //edit button function, send user to form page with record from table
    const EditRecord = (record) => {
        navigate('/createMaterial', { state: { record: record } });
    };

    //Sort method to sort numbers and strings without having to determine type in column
    const defaultSort = (a, b) => {
        if (a < b) return -1;
        if (b < a) return 1;
        return 0;
    };
  
  //Methods for search and sort in columns -----------------------

    const confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
    };
    const cancel = (e) => {
        //console.log(e);
        //message.error('Click on No');
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


    //retrieving headers from DB
    const loadHeaders = async () => {
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
                    const headerArray = [];
                    for (let i = 0; i < responseData.length; i++) {
                    var payload = {}
                    if (hideList.includes(responseData[i].COLUMN_NAME)) {
                        payload = {
                            title: responseData[i].COLUMN_NAME,
                            dataIndex: responseData[i].COLUMN_NAME,
                            key: responseData[i].COLUMN_NAME,
                            hidden: true
                        }
                    }
                    else if (responseData[i].COLUMN_NAME == "MaterialName") {
                        var payload = {
                            title: responseData[i].COLUMN_NAME,
                            dataIndex: responseData[i].COLUMN_NAME,
                            key: responseData[i].COLUMN_NAME,
                            ...getColumnSearchProps(responseData[i].COLUMN_NAME),
                            sorter: (a, b) => a.MaterialName.localeCompare(b.MaterialName),
                            sortDirections: ['ascend', 'descend'],
                        }
                    }
                    else if (responseData[i].COLUMN_NAME == "BEN") {
                        var payload = {
                            title: responseData[i].COLUMN_NAME,
                            dataIndex: responseData[i].COLUMN_NAME,
                            key: responseData[i].COLUMN_NAME,
                            ...getColumnSearchProps(responseData[i].COLUMN_NAME),
                            sorter: (a, b) => a.BEN.localeCompare(b.BEN),
                            sortDirections: ['descend', 'ascend'],
                            width: '10%',
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
                        }
                    }

                    headerArray.push(payload)
                }
                const buttonPayload = {
                    title: 'Edit Item',
                    key: 'key',
                    dataIndex: 'key',
                    render: (text, record) => (
                        <Button onClick={() => EditRecord(record)}>
                            {"Edit"}
                        </Button>
                    ),
                }
                headerArray.push(buttonPayload)
                setHeaders(headerArray)

                const buttonPayload2 = {
                    title: 'Delete Item',
                    key: 'key',
                    dataIndex: 'key',
                    render: (text, record) => (
                        <Popconfirm
                            title="Delete Record"
                            description="Are you sure you want to delete this record?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button>
                                {"Delete"}
                            </Button>
                        </Popconfirm>
                    ),
                }
                headerArray.push(buttonPayload2)
               setHeaders(headerArray)
          
                })
            }
        });
    }
    useEffect(()=> loadHeaders(),[]);

    //retrieving items from DB
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

    //assigning hidden columns
    const columnHide = (hideArray, headers) => {
        let localHideList = []
        for (let i = 0; i < hideArray.hideArray.length; i++) {
            localHideList.push(hideArray.hideArray[i])
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
            } else if (headers[i].title === "Edit Item") {
                payload = {
                    title: headers[i].title,
                    dataIndex: headers[i].dataIndex,
                    key: headers[i].key,
                    render: (text, record) => (
                            <Button onClick = { () => EditRecord(record) }>
                            { "Edit" }
                        </Button >
                    )
                }
            } else if (headers[i].title === "Delete Item") {
                payload = {
                    title: headers[i].title,
                    dataIndex: headers[i].dataIndex,
                    key: headers[i].key,
                    render: (text, record) => (
                        <Popconfirm
                            title="Delete Record"
                            description="Are you sure you want to delete this record?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button>
                                {"Delete"}
                            </Button>
                        </Popconfirm>
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

    return(
        <Table 
            className='OpenTicketTable'
            columns={filtHead}
            dataSource={items}
            style={{
                paddingTop: '10px'
            }}
            showSorterTooltip={false}
        />
    );
}
export default InventoryATable;
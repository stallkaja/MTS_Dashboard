import { Button, Space, Input, Table, Switch, Tag, configProvider, Select, message } from 'antd';
import { green } from '@mui/material/colors';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router';
import { SearchOutlined } from '@ant-design/icons';



function OpenOrderATable() {
    const defaultSort = (a, b) => {
        if (a < b) return -1;
        if (b < a) return 1;
        return 0;
    };
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
        'ClosedDate',
        'SubmitDate',
        'AdminComments',
        'AttachFile'
    ])
    const [filtHead, setFiltHead] = useState([]);
    const [headerSelect, setHeaderSelect] = useState('');

    const EditRecord = (record) => {
        navigate('/MaterialRequestform', { state: { record: record } })
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
                        else if (responseData[i].COLUMN_NAME == "RequestNumber") {
                            payload = {
                                title: responseData[i].COLUMN_NAME,
                                dataIndex: responseData[i].COLUMN_NAME,
                                key: responseData[i].COLUMN_NAME,
                                ...getColumnSearchProps(responseData[i].COLUMN_NAME),
                                sorter: {
                                    compare: (a, b) => defaultSort(a.RequestNumber - b.RequestNumber)
                                },
                                sortDirections: ['descend', 'ascend'],
                            }
                        }
                        else {
                            payload = {
                                title: responseData[i].COLUMN_NAME,
                                dataIndex: responseData[i].COLUMN_NAME,
                                key: responseData[i].COLUMN_NAME,
                                ...getColumnSearchProps(responseData[i].COLUMN_NAME),
                                sorter: {
                                    compare: (a, b) => defaultSort(a[responseData[i].COLUMN_NAME], b[responseData[i].COLUMN_NAME])
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
                                {/* <div> <a onClick={()=>{toComponentB()}}>Component B<a/></div> */}
                                {"Edit"}
                            </Button>

                        ),
                    }
                    headerArray.push(buttonPayload)
                    setHeaders(headerArray)
                    setHeaderSelect(headerArray.map(header => ({
                        key: header.title,
                        title: header.title,
                        value: header.title
                    })))

                })
            }
        });
    }

    useEffect(() => loadHeaders(), []);



    const loadItems = async () => {
        const response = await fetch('/loadOpenOrders', {
            headers: {
                'Content-Type': 'application/json'
            }

        }).then((response) => {
            if (response.ok) {
                response.json().then((responseData) => {
                    for (let i = 0; i < responseData.length; i++) {
                        //console.log(responseData[i])
                        if (responseData[i].NeedBy !== null) {
                            let cleanDate = (responseData[i].NeedBy.split('T')[0])
                            responseData[i].NeedBy = cleanDate
                        }
                        if (responseData[i].OpenDate !== null) {
                            let cleanDate = (responseData[i].OpenDate.split('T')[0])
                            responseData[i].OpenDate = cleanDate
                        }

                    }
                    setItems(responseData)
                })
            }
        });

    }

    useEffect(() => loadItems(), []);


    const columnChange = (value) => {
        console.log("ColChange got")
        console.log(value)
        let localHideList = []
        localHideList = value.map(val => {
            return val
        })
        console.log('localHideList is')
        console.log(localHideList)

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
        console.log(addHeader)
        setHeaders(addHeader)
        //setIsLoading(true)
    }

    useEffect(() => {
        let filt = []
        filt = (
            headers.filter(item => !item.hidden)
        )
        setFiltHead([...filt])
    },[headers])

    return (
        <div>
            Hidden Columns:
            <Select
                mode="multiple"
                placeholder="Select Columns to Hide"
                options={headerSelect}
                style={{
                    width: '50%',
                    paddingLeft: '5px',
                }}
                onChange={columnChange}
                defaultValue={hideList}
            />
            {/*Show All Columns
            <Switch onChange={switchChange} checked={filt} />*/}
            <Table
                className="OpenTicketTable"
                columns={filtHead}
                dataSource={items}
                bordered
            />
        </div>
    );
}

export default OpenOrderATable;
import { useState, useEffect, useRef } from 'react';
import { Button, Input, Space, Table, typography, Popconfirm, message } from 'antd';
import { useNavigate, Link } from 'react-router';
import { SearchOutlined } from '@ant-design/icons';

function ToolInfoATable(hideArray) {
    const [items, setItems] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const navigate = useNavigate();
    const [stat, setStat] = useState('Inactive');
    const [hideList, setHideList] = useState(['PK', 'Status'])
    const [pk, setPk] = useState(0);
    const [com, setCom] = useState('');
    const [filtHead, setFiltHead] = useState([]);
    //const [recPk, setRecPk] = useState('');
    //const [recStat, setRecStat] = useState('');

    //Sort method to sort numbers and strings without having to determine type in column
    const defaultSort = (a, b) => {
        if (a < b) return -1;
        if (b < a) return 1;
        return 0;
    };
    const cancel = (e) => {
        message.error('click on no');
    };
    const EditRecord = (record) => {
        console.log(record);
        navigate('/ToolInfoForm', { state: { record: record } });
    };
    const PassRecord = (record) => {
        
    }

    //handler for record deactivate button
    const confirm = async (e, record) => {
        console.log(record)
        let recPk = (record.PK);
        let recStat = (record.Status);
        const deact = { recPk, recStat };
        console.log(deact);
        const response = await fetch('/deactivate', {
            method: 'POST',
            body: JSON.stringify(deact),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                alert("Tool has been deactivated");

            } else {
                alert(`Failed to deactivate, status code = ${response.status}`);
            }
        });
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

    //retreiving headers from DB
    const loadHeaders = async () => {
        //const tName = 'caltoolstable'
        const tableName = { tName: 'caltoolstable' }
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
                                    compare: (a, b) => defaultSort(a[responseData[i].COLUMN_NAME], b[responseData[i].COLUMN_NAME])
                                },
                                sortDirections: ['descend', 'ascend'],
                                //width: '30%',
                            }

                        }
                        headerArray.push(payload)
                        

                    }
                    const buttonPayload = {
                        title: 'Edit Tool',
                        key: 'key',
                        dataIndex: 'key',
                        render: (text, record) => (
                            <Button onClick={() => EditRecord(record)}>
                                {"Edit"}
                            </Button>
                        ),
                    }
                    headerArray.push(buttonPayload)
                    const button2Payload = {
                        title: 'Deactivate Tool',
                        key: 'key',
                        dataIndex: 'key',
                        render: (text, record) => (
                            <Popconfirm
                                title="Deactivate Record"
                                description="Are you sure you want to deactivate this record?"
                                onConfirm={confirm}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button onClick={()=>PassRecord(record) }>
                                    Deactivate
                                </Button>
                            </Popconfirm>
                            
                        ),
                    }
                    headerArray.push(button2Payload)
                    setHeaders(headerArray)
                })
            }
        });
    }
    useEffect(() => loadHeaders(), []);

    //retreiving items from DB
    const loadItems = async () => {
        const response = await fetch('/calTools', {
            headers: {
                'Content-Type': 'application/json'
            }

        }).then((response) => {
            if (response.ok) {
                response.json().then((responseData) => {
                    for (let i = 0; i < responseData.length; i++) {
                        //console.log(responseData[i])
                        if(responseData[i].CalibrationDue !== null){
                            let cleanDate = (responseData[i].CalibrationDue.split('T')[0])
                            responseData[i].CalibrationDue = cleanDate
                        }

                    }
                    setItems(responseData)
                })
            }
        });
    }
    useEffect(() => loadItems(), []);

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
            } else if (headers[i].title === "Edit Tool") {
                payload = {
                    title: headers[i].title,
                    dataIndex: headers[i].dataIndex,
                    key: headers[i].key,
                    render: (text, record) => (
                        <Button onClick={() => EditRecord(record)}>
                            {"Edit"}
                        </Button >
                    )
                }
            } else if (headers[i].title === "Deactivate Tool") {
                payload = {
                    title: headers[i].title,
                    dataIndex: headers[i].dataIndex,
                    key: headers[i].key,
                    render: (text, record) => (
                        <Popconfirm
                            title="Deactivate Record"
                            description="Are you sure you want to deactivate this record?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button>
                                {"Deactivate"}
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

    return (
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
export default ToolInfoATable;
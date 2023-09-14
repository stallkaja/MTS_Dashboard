import { useState, useEffect, useRef } from 'react';
import { Button, Input, Space, Table, typography, Popconfirm, message } from 'antd';
import { useNavigate, Link } from 'react-router';
import { SearchOutlined } from '@ant-design/icons';

function ToolInfoATable(targetNVL) {
    const [items, setItems] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const navigate = useNavigate();
    const [stat, setStat] = useState('Inactive');
    const [hideList, setHideList] = useState(['PK'])
    const [pk, setPk] = useState(0);

    //Sort method to sort numbers and strings without having to determine type in column
    const defaultSort = (a, b) => {
        if (a < b) return -1;
        if (b < a) return 1;
        return 0;
    };
    const cancel = (e) => {
        console.log(e);
        message.error('click on no');
    };
    const EditRecord = (record) => {
        console.log(record);
        navigate('/ToolInfoForm', { state: { record: record } });
    };

    const DefineRecord = (record) => {
        console.log(record);
        console.log(typeof (record.PK));
        setPk(record.PK);
        console.log(pk);
    };

    //handler for record deactivate button
    const DeactRecord = async (record) => {
        message.success('click on yes');
        const deact = { record };
        console.log(deact);
        const response = await fetch('/deactivate', {
            method: 'POST',
            body: JSON.stringify(deact),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                alert("Tool has been deacitvated");
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
                        title: 'Edit',
                        key: 'key',
                        dataIndex: 'key',
                        render: (text, record) => (
                            <Button onClick={() => EditRecord(record)}>
                                {/* <div> <a onClick={()=>{toComponentB()}}>Component B<a/></div> */}
                                {"Edit"}
                            </Button>
                        ),
                    }
                    headerArray.push(buttonPayload)
                    const button2Payload = {
                        title: 'Deactivate',
                        key: 'key',
                        dataIndex: 'key',
                        render: (text, record) => (
                            <Button onClick={() => DeactRecord(record)}>
                                Deactivate
                            </Button>
                            
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

    return (
        <Table 
            className='OpenTicketTable'
            columns={headers.filter(item => !item.hidden)}
            dataSource={items}
            style={{
                paddingTop: '10px'
            } }
        />
    );
}
export default ToolInfoATable;
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag, Typography } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router';

function PassDownTable(targetNVL) {
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
    const navigate = useNavigate();
    const EditRecord = (record) => {
        navigate('/PassdownForm', { state: { record: record } });
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
                        if (responseData[i].COLUMN_NAME == "Date") {
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
                                width: '30%',
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
                        title: 'Open',
                        key: 'key',
                        dataIndex: 'key',
                        render: (text, record) => (
                            <button onClick={() => EditRecord(record)}>
                                {/* <div> <a onClick={()=>{toComponentB()}}>Component B<a/></div> */}
                                {"Open"}
                            </button>
                        ),
                    }
                    headerArray.push(buttonPayload)
                    setHeaders(headerArray)
                })
            }
        });
    }
    useEffect(() => loadHeaders(), []);

    const loadItems = async () => {
        const response = await fetch('/passdowns', {
            headers: {
                'Content-Type': 'application/json'
            }

        }).then((response) => {
            if (response.ok) {
                response.json().then((responseData) => {
                    /*for (let i = 0; i < responseData.length; i++) {
                        //console.log(responseData[i])
                        let cleanDate = (responseData[i].CalibrationDue.split('T')[0])
                        responseData[i].CalibrationDue = cleanDate
                    }*/
                    setItems(responseData)
                })
            }
        });
    }
    useEffect(() => loadItems(), []);
    return (
        <Table columns={headers.filter(col=>col.dataIndex!=='PK')} dataSource={items} />
    );
}
export default PassDownTable;
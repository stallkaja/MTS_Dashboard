import { useState, useEffect, useRef } from 'react';
import { Button, Input, Space, Table, DatePicker, Typpography, Popconfirm, message } from 'antd';
import { useNavigate, Link } from 'react-router';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

function StaggerPullListTable(hideArray) {
    const [items, setItems] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const navigate = useNavigate();
    const [stat, setStat] = useState('Inactive');
    const [hideList, setHideList] = useState(['PK'])
    const [pk, setPk] = useState(0);
    const [filtHead, setFiltHead] = useState([]);
    
    const GenList = () => {
        alert('James!!!!')
    }
    const [today, setToday] = useState(dayjs());
    const handleDate = (date, dateString) => {
        setToday(dateString)
    }
    //const [recPk, setRecPk] = useState('');
    //const [recStat, setRecStat] = useState('');

    //Sort method to sort numbers and strings without having to determine type in column
    const defaultSort = (a, b) => {
        if (a < b) return -1;
        if (b < a) return 1;
        return 0;
    };
    /*const cancel = (e) => {
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
    };*/



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


                    }/*
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
                                <Button onClick={() => PassRecord(record)}>
                                    Deactivate
                                </Button>
                            </Popconfirm>

                        ),
                    }
                    headerArray.push(button2Payload)*/
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
                        if (responseData[i].CalibrationDue !== null) {
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
            } /*else if (headers[i].title === "Edit Tool") {
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
            } */else {
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
        <div>
            <div style={{ textAlign: "Center"} } >
                <h1>Pull Date</h1>
                <DatePicker 
                    value={dayjs(today)}
                    onChange={handleDate}
                    allowClear={false}
                />

                <Button onClick={() => GenList()}>
                    {"Generate List"}
                </Button>
            </div>

            <Table
                className='OpenTicketTable'
                columns={filtHead}
                dataSource={items}
                style={{
                    paddingTop: '10px'
                }}
                showSorterTooltip={false}
            />
        </div>


    );
}

export default StaggerPullListTable;

/*
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const moment = require('moment');

function main() {
    const datax = xlsx.readFile('C:/Users/osterjo/OneDrive - Lam Research/Documents/CTU and DOS/Tool Tracker/Tool Tracking v2.xlsm', { sheet: 'All Tools' });
    const stag_data = xlsx.readFile('C:/Users/osterjo/OneDrive - Lam Research/Documents/CTU and DOS/Tool Tracker/Tool Tracking v2.xlsm', { sheet: 'Staggering List', range: 'A:A' });

    let data = datax.Sheets['All Tools'];
    let stag = stag_data.Sheets['Staggering List'];

    // Clean up data
    data = data.filter(row => !Object.values(row).every(val => val === null));
    delete data['Legend:'];

    // Convert Calibration Due to date
    data['Calibration Due'] = data['Calibration Due'].map(val => moment(val, 'YYYY-MM-DD HH:mm:ss'));

    // Handle staggering list
    if (stag['Dates:'][1] === undefined) {
        stag['Dates:'][1] = moment().format('YYYY-MM-DD');
    }
    let pull = moment(stag['Dates:'][1]);
    let send = pull.clone().add(42, 'days');
    while (send.weekday() !== 2) {
        send.add(1, 'day');
    }
    stag['Dates:'][3] = send.format('YYYY-MM-DD');

    // Sort data by Calibration Due
    data.sort((a, b) => a['Calibration Due'] - b['Calibration Due']);

    const stagger = [];
    const list = ['SENT', 'STAHLWILLE/REPAIR', 'BCP/QUARANTINED'];
    const outList = [...list, 'OUTGOING'];
    const red_list = [];
    const yel_list = [];
    const lost_list = [];

    const toolCounts = {};
    for (const tool of data['Description']) {
        toolCounts[tool] = (toolCounts[tool] || 0) + 1;
    }
    for (const [key, value] of Object.entries(toolCounts)) {
        toolCounts[key] = Math.ceil(value / 52);
    }
    const toolsCounted = Object.fromEntries(Object.entries(toolCounts).map(([k, v]) => [k, 0]));

    const late = pull.clone().add(7, 'days');
    const lowBound = pull.clone().add(35, 'days');
    const upBound = pull.clone().add(49, 'days');

    for (let n = 0; n < data['NVL #'].length; n++) {
        if (data['Calibration Due'][n] <= late) {
            if (!list.includes(data['Location'][n])) {
                stagger.push(n);
                red_list.push(n);
            }
        } else if (data['Calibration Due'][n] >= late && data['Calibration Due'][n] <= lowBound) {
            if (!list.includes(data['Location'][n])) {
                stagger.push(n);
                yel_list.push(n);
            }
        } else if (data['Location'][n] === 'LOST') {
            lost_list.push(n);
        } else if (data['Calibration Due'][n] > lowBound && data['Calibration Due'][n] < upBound) {
            if (!outList.includes(data['Location'][n])) {
                if (toolsCounted[data['Description'][n]] < toolCounts[data['Description'][n]]) {
                    stagger.push(n);
                    toolsCounted[data['Description'][n]]++;
                }
            }
        }
    }

    stagger.sort((a, b) => a - b);
    const dataz = data.filter((row, index) => stagger.includes(index));

    const book = xlsx.readFile('C:/Users/osterjo/OneDrive - Lam Research/Documents/CTU and DOS/Tool Tracker/Tool Tracking v2.xlsm');
    const sheet = book.Sheets['Staggering List'];
    sheet['A1'].v = stag;
    sheet['B1'].v = dataz;

    if (lost_list.length > 0) {
        const losted = `B2:M${lost_list.length + 2}`;
        sheet[losted].s.fill = { fgColor: { rgb: 'FFA500' } };
    }

    if (red_list.length > 0) {
        const reded = `B${lost_list.length + 2}:M${lost_list.length + red_list.length + 2}`;
        sheet[reded].s.fill = { fgColor: { rgb: 'Ff0000' } };
    }

    if (yel_list.length > 0) {
        const yeled = `B${lost_list.length + (red_list.length || 1) + 2}:M${lost_list.length + red_list.length + yel_list.length + 2}`;
        sheet[yeled].s.fill = { fgColor: { rgb: 'FFFF00' } };
    }

    const borded = `B1:M${stagger.length + 1}`;
    sheet[borded].s.border = {
        top: { style: 'thick' },
        bottom: { style: 'thick' },
        left: { style: 'thick' },
        right: { style: 'thick' }
    };

    xlsx.writeFile(book, 'C:/Users/osterjo/OneDrive - Lam Research/Documents/CTU and DOS/Tool Tracker/Tool Tracking v2.xlsm');
}

if (require.main === module) {
    main();
}

*/
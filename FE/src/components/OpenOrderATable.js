import { Button, Space, Table, Switch, Tag, configProvider, Select } from 'antd';
import { green } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';



function OpenOrderATable() {
    const [items, setItems] = useState([]);
    const [headers, setHeaders] = useState([]);
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
    const [isLoading, setIsLoading] = useState(true);

    const EditRecord = (record) => {
        console.log(record)
        navigate('/MaterialRequestform', { state: { record: record } });
    };



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
                                sorter: (a, b) => a.RequestNumber - b.RequestNumber,
                            }
                        }
                        else {
                            payload = {
                                title: responseData[i].COLUMN_NAME,
                                dataIndex: responseData[i].COLUMN_NAME,
                                key: responseData[i].COLUMN_NAME,
                            }
                        }

                        headerArray.push(payload)
                    }
                    const buttonPayload = {
                        title: 'Do it',
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
                    console.log(responseData)
                    setItems(responseData)
                })
            }
        });

    }

    useEffect(() => loadItems(), []);


    const columnChange = (value) => {
        let addValue = []
        addValue = value.map(val => {
            return val
        })
        setHideList(addValue)
        console.log(hideList)
        console.log(headers)
        let addHeader = []
        for (let i = 0; i < headers.length; i++) {
            let payload = {}
            if (hideList.includes(headers[i].title)) {
                payload = {
                    title: headers[i].title,
                    dataIndex: headers[i].dataIndex,
                    key: headers[i].key,
                    hidden: true
                }
            } else if (headers[i].title === "Do it") {
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
                    hidden: false
                }
            }
            addHeader.push(payload)
        }
        setHeaders(addHeader)
        //setIsLoading(true)
    }
    
    useEffect(() => {
        setFiltHead(
            headers.filter(item => !item.hidden)
        )
        setIsLoading(false)


    },[headers])
    console.log(filtHead)

    if (isLoading) {
        return(
            <span>Loading</span>
        )
    }

    return (
        <div>
            <Select
                mode="multiple"
                placeholder="Select Columns to Hide"
                options={headerSelect}
                style={{
                    width: '50%'
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
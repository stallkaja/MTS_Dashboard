import { Button, Space, Table, Tag, configProvider, Select } from 'antd';
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

    /*const headerSelect = headers.map(header => ({
        key: header.title,
        title: header.title,
        value: header.title
    }))

    const columnChange = (headers, value) => {
        setHideList(
            [
                ...hideList,
                (value.title)
            ]
        )
        setHeaders(headers.map(header => {
            if (hideList.title === header.title) {
                return {
                    ...headers, hidden: true
                };
            } else {
                return {
                    ...headers, hidden: false
                }
            }
        }));
    }
    console.log(hideList)
    console.log(headers)*/
    return (
        <div>
            {/*<Select
                mode="multiple"
                placeholder="Select Columns to Hide"
                options={headerSelect}
                style={{
                    width: '20%'
                }}
                onChange={columnChange}
                defaultValue={hideList}
        />*/}
        <Table
            className="OpenTicketTable"
            columns={headers.filter(item => !item.hidden)}
            dataSource={items}
            bordered
        />
        </div>
    );
}
export default OpenOrderATable;
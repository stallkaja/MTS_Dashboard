import { Button, Space, Table, Tag, configProvider, Switch } from 'antd';
import { green } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';



function SubmittedOrderATable() {
    const [items, setItems] = useState([]);
    const [headers, setHeaders] = useState([]);
    const navigate = useNavigate();
    const [hideList, setHideList] = useState([
        'Email',
        'PreferredVendor',
        'PurchNumber',
        'ClosedDate',
        'OpenDate',
        'AdminComments',
        'AttachFile'
    ])
    const [filt, setFilt] = useState(false);

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
                                sorter: (a, b) => a.TicketNum - b.TicketNum,
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
    const switchChange = (checked) => {
        setFilt(checked)
    }

    const loadItems = async () => {
        const response = await fetch('/loadSubOrders', {
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
    return (
        <div>
        Show All Columns
            < Switch onChange = { switchChange } checked = { filt } />
        <Table
            className="OpenTicketTable"
            columns={filt ? headers : headers.filter(item => !item.hidden)}
            dataSource={items}
            bordered
        />
        </div>
    );
}
export default SubmittedOrderATable;
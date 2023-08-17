import { Button, Space, Table, Tag, configProvider } from 'antd';
import { green } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';



function ClosedOrderATable() {
    const [items, setItems] = useState([]);
    const [headers, setHeaders] = useState([]);
    const navigate = useNavigate();

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

                        if (responseData[i].COLUMN_NAME == "RequestNumber") {
                            var payload = {
                                title: responseData[i].COLUMN_NAME,
                                dataIndex: responseData[i].COLUMN_NAME,
                                key: responseData[i].COLUMN_NAME,
                                sorter: (a, b) => a.TicketNum - b.TicketNum,
                            }
                        }
                        else {
                            var payload = {
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
        const response = await fetch('/loadClosedOrders', {
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
        <Table
            className="OpenTicketTable"
            columns={headers}
            dataSource={items}
            bordered
        />
    );
}
export default ClosedOrderATable;
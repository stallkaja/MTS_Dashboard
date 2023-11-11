import React from 'react';
import { Input, Space } from 'antd';
import { useState, useEffect } from 'react';
const { Search } = Input;


const GlobalSearch = ({ tName }) => {
    const [route, setRoute] = useState('');
    console.log(JSON.stringify(tName))
    useEffect(() => {
        if (tName.length === 1) {
            setRoute("/searchTable")
        } else {
            setRoute("/searchMultiTables")
        }
        
    }, [])

    const onSearch = async (value, _e, info) => {
        console.log(route);
        const response = await fetch(route, {
            method: 'POST',
            body: JSON.stringify({ tName }),
            headers: {
                'Content-Type': 'application/json'
            }

        }).then((response) => {
            if (response.ok) {
                response.json().then((responseData) => {
                    //let tempItemInputs = responseData.map((item) => {
                    //    return {
                            
                    //    };
                    //});
                    //setItemInputs(tempItemInputs)
                })
            }
        });
    }

    return(
        <Space direction="vertical">
            <Search
                placeholder="Search"
                onSearch={onSearch}
                allowClear
                style={{
                    width: 300,
                }} 
            />
        </Space>
    )
};
export default GlobalSearch;

import React from 'react';
import { Input, Space } from 'antd';
import { useState, useEffect } from 'react';
const { Search } = Input;


const GlobalSearch = ({ tName , searchCallBack}) => {
    const [route, setRoute] = useState('');
    useEffect(() => {
        if (tName.length === 1) {
            setRoute('/searchTable')
        } else {
            setRoute('/searchMultiTables')
        }
        
    }, [])

    const onSearch = async (value, _e, info) => {
        const response = await fetch(route, {
            method: 'POST',
            body: JSON.stringify({ tName , value }),
            headers: {
                'Content-Type': 'application/json'
            }

        }).then((response) => {
            if (response.ok) {
                response.json().then((responseData) => {
                    console.log(responseData)
                    searchCallBack(responseData);
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

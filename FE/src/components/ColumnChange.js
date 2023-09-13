import { useEffect, useState } from 'react';
import { Select } from 'antd';

function ColumnChange({ tName , parentPass }) { 
    const [hideList, setHideList] = useState([
        'Email',
        'PreferredVendor',
        'PurchNumber',
        'AdminComments',
        'AttachFile'
    ])
    const [optionsArray, setOptionsArray] = useState([]);
    const [hideArray, setHideArray] = useState([])

    //retrieving header data from given table and assigning them to arrays to either
    //be hidden or as part of the options of the select menu
    const loadHeaders = async () => {
        const response = await fetch('/headers', {
            method: 'POST',
            body: JSON.stringify({ tName }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                response.json().then((responseData) => {
                    let opto = [];
                    let hideo = [];
                    for (let i = 0; i < responseData.length; i++) {
                        opto.push({
                            key: responseData[i].COLUMN_NAME,
                            value: responseData[i].COLUMN_NAME,
                            title: responseData[i].COLUMN_NAME,

                        })
                        if (hideList.includes(responseData[i].COLUMN_NAME)) {
                            hideo.push(responseData[i].COLUMN_NAME)
                        }
                    }
                    setOptionsArray(opto);
                    setHideArray(hideo);

                }
                )
            }
            
        });
    }

    useEffect(() => loadHeaders(), []);
   
    //passing selections back to parent component
    const passData = (value) => {
        console.log(value)
        parentPass(value)
    }
    


    return (
        <div>Select columns to hide:
            <Select
            mode = "multiple"
            placeholder = "Select Columns to Hide"
            options = { optionsArray }
            style = {{
                width: '900px',
                paddingLeft: '5px',
            }}
            onChange = { passData }
            defaultValue = { hideList }
            />
        </div>

    )

}

export default ColumnChange;
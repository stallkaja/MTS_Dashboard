import React, { useCallback, useEffect, useState } from "react";
import { read, utils, writeFileXLSX } from 'xlsx';
import { Button } from 'antd';

function ExcelExport({ tabledData, hidingArray, ogList }) {
    /* get state data and export to XLSX */
    const exportFile = useCallback(() => {
        let newExData = []
        if (JSON.stringify(tabledData) !== JSON.stringify({ key: 1 })) {
            let dataKeys = Object.keys(tabledData[0])
            let keyArray = []
            for (let i = 0; i < dataKeys.length; i++) {
                if (JSON.stringify(hidingArray) === JSON.stringify({ key: 1 })) {
                    if (ogList.includes(dataKeys[i])) {
                        keyArray.push(i)
                    }
                }

                else {
                    if (hidingArray.includes(dataKeys[i])) {
                        keyArray.push(i)
                    }
                    
                }
            }

            for (let i = 0; i < tabledData.length; i++) {
                let row = Object.keys(tabledData[i]).map((key) => [key, tabledData[i][key]])
                for (let j = 0; j < keyArray.length; j++) {
                    row.splice(((keyArray[j]) - j), 1)
                }
                newExData.push(Object.fromEntries(row))
            }
        }
        const ws = utils.json_to_sheet(newExData);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, "SheetJSReactAoO.xlsx");
    }, [tabledData, hidingArray]);

    return (
        <div>
            <td>
                <Button onClick={exportFile}>Export to XLSX</Button>
            </td>
        </div>
    );
}

export default ExcelExport;
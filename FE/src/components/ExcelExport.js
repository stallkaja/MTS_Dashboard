import React, { useCallback, useEffect, useState } from "react";
import { read, utils, writeFileXLSX } from 'xlsx';
import { Button } from 'antd';

function ExcelExport({ tabledData, hidingArray, ogList }) {
    /* get state data and export to XLSX */
    const exportFile = useCallback(() => {
        let newExData = []
        if (JSON.stringify(tabledData) !== JSON.stringify({ key: 1 })) { //checking to see if data exists
            let dataKeys = Object.keys(tabledData[0]) //creating array of keys from data
            let keyArray = [] //array to hold location of keys that need to be removed
            for (let i = 0; i < dataKeys.length; i++) { //parsing keys
                if (JSON.stringify(hidingArray) === JSON.stringify({ key: 1 })) {  //checking to see if hiding array has new information
                    if (ogList.includes(dataKeys[i])) { //checking to see if inital setting of hidden columns is in our list of keys
                        keyArray.push(i) //recording location of keys in array
                    }
                }
                else {
                    if (hidingArray.includes(dataKeys[i])) { //checking for user updated hidden columns is in our list of keys
                        keyArray.push(i) //recording location of keys in array
                    }
                }
            }
            for (let i = 0; i < tabledData.length; i++) { //parsing initial data
                let row = Object.keys(tabledData[i]).map((key) => [key, tabledData[i][key]]) //converting object data into array
                for (let j = 0; j < keyArray.length; j++) { //parsing through each array location of key to be removed 
                    row.splice(((keyArray[j]) - j), 1) //removing information based on the hidden column selection; note that the - j is accounting for columns already removed
                }
                newExData.push(Object.fromEntries(row)) //converting row array back into object and pushing into new array
            }
        }
        const ws = utils.json_to_sheet(newExData); //converting object into excel sheet
        const wb = utils.book_new(); //creating new workbook
        utils.book_append_sheet(wb, ws, "Data"); //appending sheet to workbook
        writeFileXLSX(wb, "SheetJSReactAoO.xlsx"); //writing data to workbook
    }, [tabledData, hidingArray]); //dependancy array

    return (
        <div>
                <Button onClick={exportFile}>Export to XLSX</Button> {/*button to make things go*/}
        </div>
    );
}

export default ExcelExport;
import React, { useCallback, useEffect, useState } from "react";
import { read, utils, writeFileXLSX } from 'xlsx';
import { Button } from 'antd';

function ExcelExport(tabledData) {
    /* the component state is an array of presidents */
    const [pres, setPres] = useState([]);

    /* Fetch and update the state once */
    /*useEffect(() => {
        (async () => {
            const f = await (await fetch("https://docs.sheetjs.com/pres.xlsx")).arrayBuffer();
            const wb = read(f); // parse the array buffer
            const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
            const data = utils.sheet_to_json(ws); // generate objects
            setPres(data); // update state
        })();
    }, []);*/

    /* get state data and export to XLSX */
    const exportFile = useCallback(() => {
        console.log(tabledData)
        const ws = utils.json_to_sheet(tabledData.tabledData);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, "SheetJSReactAoO.xlsx");
    }, [tabledData]);

    return (
        <div>
            {/*<table>
                <thead><tr><th>Name</th><th>Index</th></tr></thead>
                <tbody>
                { /* generate row for each president 
                    pres.map(pres => (<tr>
                        <td>{pres.Name}</td>
                        <td>{pres.Index}</td>
                    </tr>))
                }
                </tbody>
            </table>*/}
            <td>
                <Button onClick={exportFile}>Export to XLSX</Button>
            </td>
        </div>
    );
}

export default ExcelExport;
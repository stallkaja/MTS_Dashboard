import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import InventoryATable from '../components/InventoryATable';
import { Button, Space, ConfigProvider } from 'antd';
import './MaterialListPage.css';
import ColumnChange from '../components/ColumnChange';
import ExcelExport from '../components/ExcelExport';

const HomePage = ({ setItemToEdit }) =>{
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [hideList, setHideList] = useState([
        'PK',
        'LaptopAssignedMF',
        'LaptopDepartment',
        'LaptopAssignedFEDShift',
        'LaptopAssignedFENShift',
        'LaptopAssignedBEDShift',
        'LaptopAssignedBENShift',
        'AdditionalNotes',
        'AssetNumber'])
    const OpenForm = () => {
      let path = '/createMaterial';
      navigate (path);
    }

    const [hiddenArray, setHiddenArray] = useState({ key: 1 });
    const [excelData, setExcelData] = useState({});
    const parent = (childData) => {
        return (
            setHiddenArray(childData)


        )
    }
    const excel = (childData) => {
        setExcelData(childData)
    }
    const tableNone = () => {
        //This space left intentionally blank
    }




    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#000000',
                        colorTextLightSolid: '#000000',
                        colorBorder: '#242437',
                        colorPrimaryHover: '#6ce3c6'
                    },
                }}>
                <div id='MateTitleCard'>
                    <h1 id='MaterialText'>DOS Material List</h1>
                    <ColumnChange
                        tName='materiallisttable'
                        parentPass={parent}
                        hideList={hideList} />
                </div>
                <div id='MaterialCard'>
         
                    <div id='MaterialButton'>
                        <Button onClick={() => OpenForm()}>
                            {"Create Item"}
                        </Button>
                    </div>

                    <div id="Button">
                        <ExcelExport
                            tabledData={excelData}
                            hidingArray={hiddenArray}
                            ogList={hideList}
                            tableRun={tableNone} />
                    </div>

                </div>
                <InventoryATable
                    hideArray={hiddenArray}
                    tableDataCallBack={excel} />

            </ConfigProvider>
        </>
    )
}
export default HomePage;
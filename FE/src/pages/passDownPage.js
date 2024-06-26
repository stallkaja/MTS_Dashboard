
import { useState, React }  from 'react';
import PassDownTable from '../components/PassDownTable';
import { useNavigate, Link } from 'react-router';
import { Button, ConfigProvider } from 'antd';
import './PassdownPage.css';
import ExcelExport from '../components/ExcelExport';
import ColumnChange from '../components/ColumnChange';


  
const PassdownPage = () => {
    const [excelMain, setExcelMain] = useState([]);
    const [hiddenArray, setHiddenArray] = useState({
        key: 1
    });
    const [hideList, setHideList] = useState(['PK']);
    const navigate = useNavigate();

    //navigation function to Passdown entry form
    const OpenForm = () => {
        let path = '/PassdownForm';
        navigate (path);
    }
    const parentPass = (colChangeCallBackData) => {
        return (
            setHiddenArray(colChangeCallBackData)
        )
    }
    const excel = (childData) => {
        console.log(childData)
        return (
            setExcelMain(childData)
        )
    }
    const tableNone = () => {

    }


    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#000000',
                    colorTextLightSolid: '#000000',
                    colorBorder: '#242437',
                    colorPrimaryHover: '#6ce3c6'
                },
            }}>
        
        <div>
            
            <div id='PassTitleCard'>
                <h1 id='PassTitle'>Passdown</h1>
                    <ColumnChange
                        tName='passdowntable'
                        parentPass={parentPass}
                        hideList={hideList} />
            </div>

            <div id='PassHeader'>
                <div id='PassButton'>
                    <Button onClick={() => OpenForm()}>
                        {"Create New Passdown"}
                    </Button>
                </div>
                <div id='ExportButton'>
                    <ExcelExport
                        tabledData={excelMain}
                        hidingArray={hiddenArray}
                        ogList={hideList}
                        tableRun={tableNone}  />
                </div>
            </div>
   
            <PassDownTable
                hideArray={hiddenArray}
                tableDataCallBack={excel} />
            
         </div>
    </ConfigProvider>
  );
};
  
export default PassdownPage;
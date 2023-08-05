import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Input, Select, Space, ConfigProvider, DatePicker } from 'antd';
import "./MaterialRequestForm.css";
import dayjs from 'dayjs';
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);


export default function MaterialRequestForm() {

    const history = useNavigate();
    const location = useLocation();
    const [requestStatus, setRequestStatus] = useState('Awaiting Approval');
    const [requestNum, setRequestNum] = useState('new ticket');
    const [needDate, setNeedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [openDate, setOpenDate] = useState(dayjs('1900-01-01').format('YYYY-MM-DD'));
    const [subDate, setSubDate] = useState(dayjs('1900-01-01').format('YYYY-MM-DD'));
    const [closeDate, setCloseDate] = useState(dayjs('1900-00-00').format('YYYY-MM-DD'));
    const [adminCom, setAdminCom] = useState('');
    const [costCenter, setCostCenter] = useState('');
    const [email, setEmail] = useState('');
    const [orderMethod, setOrderMethod] = useState('');
    const [purchNum, setPurchNum] = useState('');
    const [vendor, setVendor] = useState('');
    const [priority, setPriority] = useState('');
    const [requestor, setRequestor] = useState('');
    const [reqCom, setReqCom] = useState('');


    useEffect(() => {
        console.log(location)
        console.log(location.state)
        if (location.state == null) {
            console.log('record is null')

        }
        else {
            setRequestStatus(location.state.record.Status);
            setRequestNum(location.state.record.RequestNumber);
            setNeedDate(location.state.record.NeedBy);
            setOpenDate(location.state.record.OpenDate);
            setSubDate(location.state.record.SubmitDate);
            setCloseDate(location.state.record.ClosedDate);
            setAdminCom(location.state.record.AdminComments);
            setCostCenter(location.state.record.CostCenter);
            setEmail(location.state.record.Email);
            setOrderMethod(location.state.record.OrderMethod);
            setPurchNum(location.state.record.PurchNumber);
            setVendor(location.state.record.PreferredVendor);
            setPriority(location.state.record.Priority);
            setRequestor(location.state.record.Requestor);
            setReqCom(location.state.record.RequestorComments);
        };
    }, []) // <-- empty dependency array






    //----------------------------------------------------------------------------
    // Make a POST request to create a new material
    //----------------------------------------------------------------------------
    const addRequest = async () => {
        // Create new object with the variables set in the form
        console.log('Request status is: ' + requestStatus)
        const newReq = { 
            requestNum, 
            requestStatus, 
            needDate, 
            openDate, 
            subDate, 
            closeDate, 
            adminCom, 
            costCenter, 
            email, 
            orderMethod, 
            purchNum, 
            vendor, 
            priority, 
            requestor, 
            reqCom
        };
        console.log(newReq)
        const response = await fetch('/newRequest', {
            method: 'POST',
            body: JSON.stringify(newReq),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                alert("Request has been added!");
                history('/MaterialOrderingPage');
            } else {
                alert(`Failed to add Request, status code = ${response.status}`);
            }
        });

    }
    const navigate = useNavigate();
    const backButton = () => {
        let path = '/MaterialOrderingPage';
        navigate(path);
    }
    const handleStatus = (value) => {
        setRequestStatus(value)
    }
    const handleCostCenter = (value) => {
        setCostCenter(value)
    }
    const handlePriority = (value) => {
        setPriority(value)
    }
    const handleVendor = (value) => {
        setVendor(value)
    }
    const handleNeedDate = (date, dateString) => {
        setNeedDate(dateString)
    }
    const handleOpenDate = (date, dateString) => {
        setOpenDate(dateString)
    }
    const handleSubDate = (date, dateString) => {
        setSubDate(dateString)
    }
    const handleCloseDate = (date, dateString) => {
        setCloseDate(dateString)
    }

    const { TextArea } = Input;

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ffffff',
                    colorTextLightSolid: '#000000',
                    colorBorder: '#000000',
                    //lineType: 'default',
                    //lineWidth: '1',
                    colorPrimaryHover: '#6ce3c6'
                },
            }}>
            <div>
                <h1>Order Request Form</h1>
                <div id="reqHeader" />

                <div id="reqFormCard">
                    <div id="reqInputBox">
                        <div id="reqLabel">Ticket Status</div>

                        <Select
                            defaultValue="awaitingApproval"
                            value={requestStatus}
                            onChange={handleStatus}
                            options={[
                                { value: 'awaitingApproval', label: 'Awaiting Approval', },
                                { value: 'Submitted', label: 'Submitted', },
                                { value: 'Arrived', label: 'Arrived', },
                            ]}
                        />
                    </div>
                

                    <div id="reqInputBox">
                        <div id="reqLabel">Request Number</div>
                        <Input 
                            readonly={1} 
                            placeholder="Request Number" 
                            value={requestNum} 
                            onChange={e => setRequestNum(e.target.value)} 
                        />
                    </div>

                    <div id="reqInputBox">
                        <div id="reqLabel">Requestor</div>
                        <Input 
                            placeholder="Requestor" 
                            value={requestor} 
                            onChange={e => setRequestor(e.target.value)} 
                        />
                    </div>

                    <div id="reqInputBox">
                        <div id="reqLabel">Requestor Email</div>
                        <Input
                            placeholder="Requestor Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div id='reqFormCard'>
                    <div id="reqInputBox">
                        <div id="reqLabel">Cost Center</div>
                        <Select
                            value={costCenter}
                            onChange={handleCostCenter}
                            options={[
                                { value: '17015', label: '17015', },
                                { value: '17020', label: '17012', },
                                { value: '17021', label: '17021', },
                                { value: '17025', label: '17025', },
                                { value: '17028', label: '17028 - Assembly', },
                                { value: '17029', label: '17029 - Final Test', },
                                { value: '17030', label: '17030', },
                                { value: '17031', label: '17031', },
                                { value: '17032', label: '17032', },
                                { value: '17035', label: '17035', },
                                { value: '17038', label: '17038', },
                                { value: '17039', label: '17039', },
                                { value: '17048', label: '17048', },
                                { value: '20120', label: '20120', },
                                { value: '27109', label: '27109 - Pilot', },
                                { value: '72031', label: '72031', },
                                { value: '77012', label: '77012', },
                            ]}
                        />
                    </div>

                    <div id="reqInputBox">
                        <div id="reqLabel">Priority</div>

                        <Select
                            defaultValue="1-Low"
                            value={priority}
                            onChange={handlePriority}
                            options={[
                                { value: '1', label: '1-Low', },
                                { value: '2', label: '2', },
                                { value: '3', label: '3-Medium', },
                                { value: '4', label: '4', },
                                { value: '5', label: '5-High', },
                            ]}
                        />
                    </div>

                    <div id="reqInputBox">
                        <div id="reqLabel">Preferred Vendor</div>

                        <Select
                            value={vendor}
                            onChange={handleVendor}
                            options={[
                                { value: 'amazon', label: 'Amazon', },
                                { value: 'grainger', label: 'Grainger', },
                                { value: 'mcMasterCarr', label: 'McMaster Carr', },
                            ]}
                        />
                    </div>

                    <div id="reqInputBox">
                        <div id="reqLabel">Need by Date (At least 2 weeks)</div>
                        <DatePicker
                            value={dayjs(needDate,'YYYY-MM-DD')}
                            onChange={handleNeedDate}
                            allowClear={false}
                        />
                    </div>
                </div>
                
                <div id="reqLabel">Requestor Comments</div>
                <div id="reqTextBox">
                    <TextArea 
                        rows={6} 
                        value={reqCom} 
                        placeholder="Commments" 
                        onChange={e => setReqCom(e.target.value)} 
                    />
                </div>

                <div id='reqFormCard'>
                    <div id="reqInputBox">
                        <div id="reqLabel">Purchase Order Number</div>
                        <Input
                            placeholder="Purchase Order Number"
                            value={purchNum}
                            onChange={e => setPurchNum(e.target.value)}
                        />
                    </div>
                    <div id="reqInputBox">
                        <div id="reqLabel">Opened Date</div>
                        <DatePicker
                            value={dayjs(openDate)}
                            onChange={handleOpenDate}
                            allowClear={false}
                            disabled
                        />
                    </div>
                    <div id="reqInputBox">
                        <div id="reqLabel">Submitted Date</div>
                        <DatePicker
                            value={dayjs(subDate)}
                            onChange={handleSubDate}
                            allowClear={false}
                            disabled
                        />
                    </div>
                    <div id="reqInputBox">
                        <div id="reqLabel">Closed Date</div>
                        <DatePicker
                            value={dayjs(closeDate)}
                            onChange={handleCloseDate}
                            allowClear={false}
                            disabled
                        />
                    </div>
                </div>

                <div id="reqLabel">Admin Comments</div>
                <div id="reqTextBox">
                    <TextArea
                        rows={6}
                        value={adminCom}
                        placeholder="Administrator Commments"
                        onChange={e => setAdminCom(e.target.value)}
                    />
                </div>


                <div id="reqButtonBox">
                    <div id="reqBackButton">
                        <Button onClick={backButton}>Back</Button>
                    </div>

                    <div id="reqSubmitButton">
                        <Button onClick={addRequest}> Save </Button>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    )
}
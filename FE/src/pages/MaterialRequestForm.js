import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Upload, Input, Select, Space, ConfigProvider, DatePicker, Form } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "./MaterialRequestForm.css";
import dayjs from 'dayjs';
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);


export default function MaterialRequestForm() {

    const history = useNavigate();
    const location = useLocation();
    const [requestStatus, setRequestStatus] = useState('awaitingApproval');
    const [requestNum, setRequestNum] = useState('new ticket');
    const [needDate, setNeedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [openDate, setOpenDate] = useState('');
    const [subDate, setSubDate] = useState('');
    const [closeDate, setCloseDate] = useState('');
    const [adminCom, setAdminCom] = useState('');
    const [costCenter, setCostCenter] = useState('');
    const [email, setEmail] = useState('');
    const [orderMethod, setOrderMethod] = useState('');
    const [purchNum, setPurchNum] = useState('');
    const [vendor, setVendor] = useState('');
    const [priority, setPriority] = useState('');
    const [requestor, setRequestor] = useState('');
    const [reqCom, setReqCom] = useState('');
    const [lineArray, setLineArray] = useState([]);
    const [itemInputs, setItemInputs] = useState([]);
    const cost = [
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
        { label: '17039', value: '17039', },
        { label: '17048', value: '17048', },
        { label: '20120', value: '20120', },
        { label: '27109 - Pilot', value: '27109', },
        { label: '72031', value: '72031', },
        { label: '77012', value: '77012', },

    ];
    const dateFormat="YYYY-MM-DD";

    //Checking for new record and instantiating record if editing
    useEffect(() => {
        if (location.state == null) {
            console.log('record is null')
            form.setFieldsValue({
                reqNum: 'new ticket',
                requestStatus: 'awaitingApproval',
                openDate: dayjs().format('YYYY-MM-DD')
            })
        }
        else {
            setRequestStatus(location.state.record.Status);
            setRequestNum(location.state.record.RequestNumber);
            setNeedDate(dayjs(location.state.record.NeedBy));
            setOpenDate(dayjs(location.state.record.OpenDate));
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
            loadLineItems(location.state.record.RequestNumber)
            form.setFieldsValue({
                reqNum: location.state.record.RequestNumber,
                requestStatus: location.state.record.Status,
                orderMethod: location.state.record.OrderMethod,
                requestor: location.state.record.Requestor,
                requestorEmail: location.state.record.Email,
                costCenter: location.state.record.CostCenter,
                priority: location.state.record.Priority,
                preferredVendor: location.state.record.PreferredVendor,
                needDate: dayjs(location.state.record.NeedBy).format('YYYY-MM-DD'),
                comments: location.state.record.RequestorComments,
                purchNum: location.state.record.PurchNumber,
                openDate: dayjs(location.state.record.OpenDate).format('YYYY-MM-DD'),
                subDate: dayjs(location.state.record.SubmitDate).format('YYYY-MM-DD'),
                closeDate: dayjs(location.state.record.ClosedDate).format('YYYY-MM-DD'),
                adminCom: location.state.record.AdminComments
            })
        };
    }, []) // <-- empty dependency array make useEffect fire only once



    
    //----------------------------------------------------------------------------
    // Make a POST request to load line items
    //----------------------------------------------------------------------------
    const loadLineItems = async (localRequestNum) => {
        console.log("loading line items from : " + localRequestNum)
        const response = await fetch('/loadLineItems', {
            method: 'POST',
            body: JSON.stringify({ localRequestNum }),
            headers: {
                'Content-Type': 'application/json'
            }

        }).then((response) => {
            if (response.ok) {
                response.json().then((responseData) => {
                    console.log(responseData)
                    let tempItemInputs = responseData.map((item) => {
                        return {
                            partName: item.PartName,
                            partNumber: item.PartNumber,
                            price: item.PricePer.toString(),
                            quantity: item.Quantity.toString(),
                            lineStatus: item.Status,
                            pk: item.PK,
                        };
                      });
                    setItemInputs(tempItemInputs)
                })
            }
        });
    }



    //----------------------------------------------------------------------------
    // Make a POST request to create a new material
    //----------------------------------------------------------------------------
    const addRequest = async (payload) => {
        // Create new object with the variables set in the form
        console.log(payload)
        const response = await fetch('/newRequest', {
            method: 'POST',
            body: JSON.stringify(payload),
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
    const addAttachment = async (payload) => {
        // Create new object with the variables set in the form
        console.log(payload)
        const formie = new FormData()
        formie.append("attachment", payload.attachment.file.orignFileObj)
        const response = await fetch('/newAttachment', {
            method: 'POST',
            body: formie,
            headers: {
                'Content-Type': 'multipart/form-data'
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

    //handling changes in the form
    const handleStatus = (value) => {
        form.setFieldsValue({
            requestStatus: value
        })
        setRequestStatus(value)
    }
    const handleMethod = (value) => {
        form.setFieldsValue({
            orderMethod: value
        })
        setOrderMethod(value)
    }
    const handleCostCenter = (value) => {
        form.setFieldsValue({
            costCenter: value
        })
        setCostCenter(value)
    }
    const handlePriority = (value) => {
        form.setFieldsValue({
            priority: value
        })
        setPriority(value)
    }
    const handleVendor = (value) => {
        form.setFieldsValue({
            preferredVendor: value
        })
        setVendor(value)
    }
    const handleNeedDate = (date, dateString) => {
        form.setFieldsValue({
            needDate: dateString
        })
        setNeedDate(dateString)
    }
    const handleOpenDate = (date, dateString) => {
        form.setFieldsValue({
            openDate: dateString
        })
        setOpenDate(dateString)
    }
    const handleSubDate = (date, dateString) => {
        form.setFieldsValue({
            subDate: dateString
        })
        setSubDate(dateString)
    }
    const handleCloseDate = (date, dateString) => {
        form.setFieldsValue({
            closeDate: dateString
        })
        setCloseDate(dateString)
    }

    const { TextArea } = Input;

    const [form] = Form.useForm();

    //form submit function
    const onFinish = (values) => {
        addRequest(values)
        addAttachment(values)
    };
    //assigning line items into form
    useEffect(() => {
        form.setFieldsValue({
            lineItems: itemInputs
        });
    }, [itemInputs]);


    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ffffff',
                    colorTextLightSolid: '#000000',
                    colorBorder: '#000000',
                    colorPrimaryHover: '#6ce3c6'
                },
            }}>
            <div>
                <h1>Order Request Form</h1>
                <div id="reqHeader" />

                <Form
                    form={form}
                    name="dynamic_form_complex"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <div id="reqFormCard">
                        <div id="reqInputBox">
                            <Form.Item
                                name="requestStatus"
                                label="Request Status"
                                rules={[
                                    {
                                        required: false,
                                    }
                                ] }
                            >
                            <Select
                                initialValue="awaitingApproval"
                                value={requestStatus}
                                onChange={handleStatus}
                                options={[
                                    { value: 'awaitingApproval', label: 'Awaiting Approval', },
                                    { value: 'submitted', label: 'Submitted', },
                                    { value: 'arrived', label: 'Arrived', },
                                ]}
                            />
                            </Form.Item>
                        </div>
                        
                        <Form.Item
                            name="reqNum"
                            label="Request Number"
                            rules={[
                                {
                                    required: false
                                }
                            ] }
                        >
                            <div id="reqInputBox">
                                <Input 
                                    readonly={1} 
                                    placeholder="Request Number" 
                                    value={requestNum} 
                                    onChange={e => setRequestNum(e.target.value)} 
                                />
                            </div>
                        </Form.Item>

                        <div id="reqInputBox">
                            <Form.Item
                                name="orderMethod"
                                label="Order Method"
                                rules={[
                                    {
                                        required: true,
                                        message: "Missing Order Method"
                                    }
                                ]}
                            >
                                <Select
                                    value={orderMethod}
                                    onChange={handleMethod}
                                    options={[
                                        { value: 'ariba', label: 'ARIBA', },
                                        { value: 'PO', label: 'PO/PR', },
                                        { value: 'ERF', label: 'ERF/RPM', },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                        
                        <Form.Item
                            name="requestor"
                            label="Requestor"
                            rules={[
                                {
                                    required:true,
                                    message: "Missing Name"    
                                }
                            ] }
                        >
                            <div id="reqInputBox">
                                <Input 
                                    placeholder="Requestor" 
                                    value={requestor} 
                                    onChange={e => setRequestor(e.target.value)} 
                                />
                            </div>
                        </Form.Item>
                        
                        <Form.Item
                            name="requestorEmail"
                            label="Requestor's Email"
                            rules={[
                                {
                                    required: true,
                                    message: "Missing Email"
                                }
                            ] }
                        >
                        <div id="reqInputBox">
                            <Input
                                placeholder="Requestor Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        </Form.Item>
                    </div>
                    
                    <div id="reqFormCard">
                        <Form.Item
                            name="costCenter"
                            label="Cost Center"
                            rules={[
                                {
                                    required: true,
                                    message: "Missing Cost Center"
                                }
                            ] }
                        >
                            <div id="reqInputBox">
                                <Select
                                    value={costCenter}
                                    onChange={handleCostCenter}
                                    options={cost}
                                />
                            </div>
                        </Form.Item>
                        
                        <Form.Item
                            name="priority"
                            label="Priority"
                            rules={[
                                {
                                    required: true,
                                    message: "Missing Priority"
                                }
                            ] }
                        >
                            <div id="reqInputBox">
                                <Select
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
                        </Form.Item>

                        <Form.Item
                            name="preferredVendor"
                            label="Preferred Vendor"
                            rules={[
                                {
                                    required: false
                                }
                            ] }
                        >
                            <div id="reqInputBox">
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
                        </Form.Item>

                        <Form.Item
                            name="needDate"
                            label="Need by Date (At least 2 weeks)"
                            rules={[
                                {
                                    required: true,
                                    message: "Missing Need Date"
                                }
                            ] }
                        >
                            <div id="reqInputBox">
                                <DatePicker
                                    value={dayjs(needDate)}
                                    format={dateFormat}
                                    onChange={handleNeedDate}
                                    allowClear={false}
                                />
                            </div>
                        </Form.Item>

                        <Form.Item
                            name="attachment"
                            label="Attach a File"
                        >
                            <div id="reqInputBox">
                                <Upload
                                    showUploadList={false}>
                                    <Button>
                                        {"Upload Hate" }
                                    </Button>
                                </Upload>                                   
                            </div>
                        </Form.Item>
                    </div>
                    
                    <Form.Item
                        name="comments"
                        label="Requestor Comments"
                    >
                        <div id="reqTextBox">
                            <TextArea 
                                rows={6} 
                                value={reqCom} 
                                placeholder="Commments" 
                                onChange={e => setReqCom(e.target.value)} 
                            />
                        </div>
                    </Form.Item>
                    <div id="reqLineCard">
                        <Form.List name="lineItems">
                            {(fields, {add, remove }) => (
                                <>
                                    {fields.map((field) => (
                                        <Space key={field.key} align="baseline">

                                            <Form.Item
                                                {...field}
                                                label="Part Name"
                                                name={[field.name, 'partName']}
                                                fieldKey={[field.fieldKey, "partName"] }
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Mising Part Name"
                                                    }
                                                ] }
                                                shouldUpdate={(prevValues, curValues) =>
                                                    prevValues.partName !== curValues.partName
                                                }
                                            >
                                                <Input placeholder="Part Name" />
                                            </Form.Item>

                                            <Form.Item
                                                {...field}
                                                label="Part Number"
                                                name={[field.name, 'partNumber']}
                                                fieldKey={[field.fieldKey, "partNumber"]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Missing Part Number"
                                                    }
                                                ] }
                                            >
                                                <Input placeholder="Part Number" />
                                            </Form.Item>

                                            <Form.Item
                                                {...field}
                                                label="Price"
                                                name={[field.name, 'price']}
                                                fieldKey={[field.fieldKey, "price"]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Missing Part Price"
                                                    }
                                                ]}
                                            >
                                                <Input placeholder="Price" />
                                            </Form.Item>

                                            <Form.Item
                                                {...field}
                                                label="Quantity"
                                                name={[field.name, 'quantity']}
                                                fieldKey={[field.fieldKey, "quantity"]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Missing Part Quantity"
                                                    }
                                                ]}
                                            >
                                                <Input placeholder="Quantity" />
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                label="Status"
                                                name={[field.name, 'lineStatus']}
                                                fieldKey={[field.fieldKey, "lineStatus"]}
                                                rules={[
                                                    {
                                                        required: false
                                                    }
                                                ]}
                                            >
                                                <Select
                                                    options={[
                                                        { value: 'awaitingApproval', label: 'Awaiting Approval', },
                                                        { value: 'submitted', label: 'Submitted', },
                                                        { value: 'arrived', label: 'Arrived', },
                                                        { value: 'rejected', label: 'Rejected'}
                                                    ]}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                label="PK"
                                                name={[field.name, 'pk']}
                                                fieldKey={[field.fieldkey, "pk"]}
                                                hidden="true">
                                                <Input />
                                            </Form.Item>
                                                
                                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                                        </Space>

                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add Line
                                        </Button>
                                    </Form.Item>
                                </>
                            )
                        }
                        </Form.List>
                    </div>

                    <div id="reqFormCard">
                        <Form.Item
                            name="purchNum"
                            label="Purchase Order Number"
                        >
                            <div id="reqInputBox">
                                <Input
                                    placeholder="Purchase Order Number"
                                    value={purchNum}
                                    onChange={e => setPurchNum(e.target.value)}
                                />
                            </div>
                        </Form.Item>

                        <Form.Item
                            name="openDate"
                            label="Opened Date"
                        >
                            <div id="reqInputBox">
                                <DatePicker
                                    value={dayjs(openDate)}
                                    format={dateFormat}
                                    onChange={handleOpenDate}
                                    allowClear={false}
                                    disabled
                                />
                            </div>
                        </Form.Item>

                        <Form.Item
                            name="subDate"
                            label="Submitted Date"
                        >
                            <div id="reqInputBox">
                                <DatePicker
                                    value={dayjs(subDate)}
                                    format={dateFormat}
                                    onChange={handleSubDate}
                                    allowClear={false}
                                    disabled
                                />
                            </div>
                        </Form.Item>

                        <Form.Item
                            name="closeDate"
                            label="Closed Date"
                        >
                        <div id="reqInputBox">
                            <DatePicker
                                value={dayjs(closeDate)}
                                    format={dateFormat}
                                onChange={handleCloseDate}
                                allowClear={false}
                                disabled
                            />
                        </div>
                        </Form.Item>
                    </div>
              
                    <Form.Item
                        name="adminCom"
                        label="Admin Comments"
                    >
                        <div id="reqTextBox">
                            <TextArea
                                rows={6}
                                value={adminCom}
                                placeholder="Administrator Commments"
                                onChange={e => setAdminCom(e.target.value)}
                            />
                        </div>
                    </Form.Item>


                    <div id="reqButtonBox">
                        <Form.Item>
                            <div id="reqBackButton">
                                <Button onClick={backButton}>Back</Button>
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <div id="reqSubmitButton">
                                <Button htmlType="submit"> Save </Button>
                            </div>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </ConfigProvider>
        )
}
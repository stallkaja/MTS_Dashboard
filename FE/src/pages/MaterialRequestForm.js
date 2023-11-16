import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, message, Upload, Input, Select, Space, ConfigProvider, DatePicker, Form } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "./MaterialRequestForm.css";
import dayjs from 'dayjs';
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);


export default function MaterialRequestForm() {

    const history = useNavigate();
    const location = useLocation();
    const [Status, setStatus] = useState('awaitingApproval');
    const [RequestNumber, setRequestNumber] = useState('new ticket');
    const [NeedBy, setNeedBy] = useState(dayjs().format('YYYY-MM-DD'));
    const [OpenDate, setOpenDate] = useState('');
    const [SubmitDate, setSubmitDate] = useState('');
    const [ClosedDate, setClosedDate] = useState('');
    const [AdminComments, setAdminComments] = useState('');
    const [CostCenter, setCostCenter] = useState('');
    const [Email, setEmail] = useState('');
    const [OrderMethod, setOrderMethod] = useState('');
    const [PurchNumber, setPurchNumber] = useState('');
    const [PrefferedVendor, setPrefferedVendor] = useState('');
    const [Priority, setPriority] = useState('');
    const [Requestor, setRequestor] = useState('');
    const [AttachFile, setAttachFile] = useState('');
    const [RequestorComments, setRequestorComments] = useState('');
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

    const [fileList, setFileList] = useState([]);

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
            console.log(location.state.record.AttachFile)
            setStatus(location.state.record.Status);
            setRequestNumber(location.state.record.RequestNumber);
            setNeedBy(dayjs(location.state.record.NeedBy));
            setOpenDate(dayjs(location.state.record.OpenDate));
            setSubmitDate(location.state.record.SubmitDate);
            setClosedDate(location.state.record.ClosedDate);
            setAdminComments(location.state.record.AdminComments);
            setCostCenter(location.state.record.CostCenter);
            setEmail(location.state.record.Email);
            setOrderMethod(location.state.record.OrderMethod);
            setPurchNumber(location.state.record.PurchNumber);
            setPrefferedVendor(location.state.record.PreferredVendor);
            setPriority(location.state.record.Priority);
            setRequestor(location.state.record.Requestor);
            setRequestorComments(location.state.record.RequestorComments);
            loadLineItems(location.state.record.RequestNumber)
            setAttachFile(location.state.record.AttachFile)
            form.setFieldsValue({
                RequestNumber: location.state.record.RequestNumber,
                Status: location.state.record.Status,
                OrderMethod: location.state.record.OrderMethod,
                Requestor: location.state.record.Requestor,
                Email: location.state.record.Email,
                CostCenter: location.state.record.CostCenter,
                Priority: location.state.record.Priority,
                PreferredVendor: location.state.record.PreferredVendor,
                NeedBy: dayjs(location.state.record.NeedBy).format('YYYY-MM-DD'),
                RequestorComments: location.state.record.RequestorComments,
                PurchNumber: location.state.record.PurchNumber,
                OpenDate: dayjs(location.state.record.OpenDate).format('YYYY-MM-DD'),
                SubmitDate: dayjs(location.state.record.SubmitDate).format('YYYY-MM-DD'),
                ClosedDate: dayjs(location.state.record.ClosedDate).format('YYYY-MM-DD'),
                AdminComments: location.state.record.AdminComments,
                AttachFile: location.state.record.AttachFile
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
                    let tempItemInputs = responseData.map((item) => {
                        return {
                            PartName: item.PartName,
                            PartNumber: item.PartNumber,
                            PricePer: item.PricePer.toString(),
                            Quantity: item.Quantity.toString(),
                            Status: item.Status,
                            PK: item.PK,
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
        formie.append("attachment", payload.attachment.file)
        console.log('attemping attachment post req')
        const response = await fetch('/newAttachment', {
            method: 'POST',
            body: formie
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
            Status: value
        })
        setStatus(value)
    }
    const handleMethod = (value) => {
        form.setFieldsValue({
            OrderMethod: value
        })
        setOrderMethod(value)
    }
    const handleCostCenter = (value) => {
        form.setFieldsValue({
            CostCenter: value
        })
        setCostCenter(value)
    }
    const handlePriority = (value) => {
        form.setFieldsValue({
            Priority: value
        })
        setPriority(value)
    }
    const handleVendor = (value) => {
        form.setFieldsValue({
            PreferredVendor: value
        })
        setPrefferedVendor(value)
    }
    const handleNeedDate = (date, dateString) => {
        form.setFieldsValue({
            NeedBy: dateString
        })
        setNeedBy(dateString)
    }
    const handleOpenDate = (date, dateString) => {
        form.setFieldsValue({
            OpenDate: dateString
        })
        setOpenDate(dateString)
    }
    const handleSubDate = (date, dateString) => {
        form.setFieldsValue({
            SubmitDate: dateString
        })
        setSubmitDate(dateString)
    }
    const handleCloseDate = (date, dateString) => {
        form.setFieldsValue({
            ClosedDate: dateString
        })
        setClosedDate(dateString)
    }

    const { TextArea } = Input;

    const [form] = Form.useForm();


    const props = {
        headers: {
          authorization: 'authorization-text',
        },
        action: '/newAttachment',
        name: 'attachment',
      };


    //form submit function
    const onFinish = (values) => {
        console.log('onFinish')
        addRequest(values)
        console.log('attachmentNext')
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
                                name="Status"
                                label="Request Status"
                                rules={[
                                    {
                                        required: false,
                                    }
                                ] }
                            >
                            <Select
                                initialValue="awaitingApproval"
                                value={Status}
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
                            name="RequestNumber"
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
                                    value={RequestNumber} 
                                    onChange={e => setRequestNumber(e.target.value)} 
                                />
                            </div>
                        </Form.Item>

                        <div id="reqInputBox">
                            <Form.Item
                                name="OrderMethod"
                                label="Order Method"
                                rules={[
                                    {
                                        required: true,
                                        message: "Missing Order Method"
                                    }
                                ]}
                            >
                                <Select
                                    value={OrderMethod}
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
                            name="Requestor"
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
                                    value={Requestor} 
                                    onChange={e => setRequestor(e.target.value)} 
                                />
                            </div>
                        </Form.Item>
                        
                        <Form.Item
                            name="Email"
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
                                value={Email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        </Form.Item>
                    </div>
                    
                    <div id="reqFormCard">
                        <Form.Item
                            name="CostCenter"
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
                                    value={CostCenter}
                                    onChange={handleCostCenter}
                                    options={cost}
                                />
                            </div>
                        </Form.Item>
                        
                        <Form.Item
                            name="Priority"
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
                                    value={Priority}
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
                            name="PrefferedVendor"
                            label="Preferred Vendor"
                            rules={[
                                {
                                    required: false
                                }
                            ] }
                        >
                            <div id="reqInputBox">
                                <Select
                                    value={PrefferedVendor}
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
                            name="NeedBy"
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
                                    value={dayjs(NeedBy)}
                                    format={dateFormat}
                                    onChange={handleNeedDate}
                                    allowClear={false}
                                />
                            </div>
                        </Form.Item>

                        <Form.Item
                            name="AttachFile"
                            label="Attach a File"
                            //defaultFileList={AttachFile}
                        >
                            <div id="reqInputBox">
                            <Upload {...props}
                                    //fileList={AttachFile}
                            onChange={(response) => {
                                console.log('in change')
                                if (response.file.status !== 'uploading') {
                                console.log(response.file, response.fileList, response.file.url);
                                }
                                if (response.file.status === 'done') {
                                message.success(`${response.file.name} 
                                                file uploaded successfully`);
                                } else if (response.file.status === 'error') {
                                message.error(`${response.file.name} 
                                                file upload failed.`);
                                }
                            }}
                            >
                            <Button>Upload File</Button>
                            </Upload>                                   
                            </div>
                        </Form.Item>
                    </div>
                    
                    <Form.Item
                        name="RequestorComments"
                        label="Requestor Comments"
                    >
                        <div id="reqTextBox">
                            <TextArea 
                                rows={6} 
                                value={RequestorComments} 
                                placeholder="Commments" 
                                onChange={e => setRequestorComments(e.target.value)} 
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
                                                name={[field.name, 'PartName']}
                                                fieldKey={[field.fieldKey, "PartName"] }
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
                                                name={[field.name, 'PartNumber']}
                                                fieldKey={[field.fieldKey, "PartNumber"]}
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
                                                name={[field.name, 'PricePer']}
                                                fieldKey={[field.fieldKey, "PricePer"]}
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
                                                name={[field.name, 'Quantity']}
                                                fieldKey={[field.fieldKey, "Quantity"]}
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
                                                name={[field.name, 'Status']}
                                                fieldKey={[field.fieldKey, "Status"]}
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
                                                name={[field.name, 'PK']}
                                                fieldKey={[field.fieldkey, "PK"]}
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
                            name="PurchNumber"
                            label="Purchase Order Number"
                        >
                            <div id="reqInputBox">
                                <Input
                                    placeholder="Purchase Order Number"
                                    value={PurchNumber}
                                    onChange={e => setPurchNumber(e.target.value)}
                                />
                            </div>
                        </Form.Item>

                        <Form.Item
                            name="OpenDate"
                            label="Opened Date"
                        >
                            <div id="reqInputBox">
                                <DatePicker
                                    value={dayjs(OpenDate)}
                                    format={dateFormat}
                                    onChange={handleOpenDate}
                                    allowClear={false}
                                    disabled
                                />
                            </div>
                        </Form.Item>

                        <Form.Item
                            name="SubmitDate"
                            label="Submitted Date"
                        >
                            <div id="reqInputBox">
                                <DatePicker
                                    value={dayjs(SubmitDate)}
                                    format={dateFormat}
                                    onChange={handleSubDate}
                                    allowClear={false}
                                    disabled
                                />
                            </div>
                        </Form.Item>

                        <Form.Item
                            name="ClosedDate"
                            label="Closed Date"
                        >
                        <div id="reqInputBox">
                            <DatePicker
                                value={dayjs(ClosedDate)}
                                    format={dateFormat}
                                onChange={handleCloseDate}
                                allowClear={false}
                                disabled
                            />
                        </div>
                        </Form.Item>
                    </div>
              
                    <Form.Item
                        name="AdminComments"
                        label="Admin Comments"
                    >
                        <div id="reqTextBox">
                            <TextArea
                                rows={6}
                                value={AdminComments}
                                placeholder="Administrator Commments"
                                onChange={e => setAdminComments(e.target.value)}
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
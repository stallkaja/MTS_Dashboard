/* eslint-disable no-restricted-globals */
import { useState, useEffect, useRef } from 'react';
import { Button, Input, Space, Table, typography,DatePicker,ConfigProvider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs'; 
import "./PassdownForm.css"
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

export default function CreatePassdownPage() {

    const history = useNavigate();
    const location = useLocation();
    const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [shift, setShift] = useState('');
    const [tech, setTech] = useState('');
    const [depar, setDepar] = useState('');
    const [pass, setPass] = useState('');
    const [pk, setPk] = useState('new');

    //checking for record null, if not null loads record into local vars
    useEffect(() => {

        if (location.state == null) {
            console.log('record is null')

        }
        else {
            setDate(location.state.record.Date);
            setShift(location.state.record.Shift);
            setTech(location.state.record.Technician);
            setDepar(location.state.record.Department);
            setPass(location.state.record.Passdown);
            setPk(location.state.record.PK);
        };
    }, [])

    const addPass = async () => {
        // Create new object with the variables set in the form
        const newPass = { date, shift, tech, depar, pass, pk };
        const response = await fetch('/newPass', {
            method: 'POST',
            body: JSON.stringify(newPass),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                alert("PassDown has been created!");
                history('/PassDownPage');
            } else {
                alert(`Failed to create PassDown, status code = ${response.status}`);
            }
        });
    }

    //handles datepicker changes
    const onPick = (date, dateString) => {
        setDate(dateString)
    }
    
    
    const navigate = useNavigate();
    const backButton = () => {
        let path = '/PassDownPage';
        navigate(path);
    }
    const { TextArea } = Input;
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#6ce3c6',
                    colorTextLightSolid: '#000000',
                    colorBorder: '#000000',
                    colorPrimaryHover: '#6ce3c6'
                },
            }}>
            <div>
                <h1>Passdown Entry</h1>
                <div id="PassFormInfoHeader" />


                <div id="PassFormCard">
                    <div id="PassFormInputBox">
                        <div id="PassFormLabel">Shift</div>
                        <Input 
                            placeholder="Shift"
                            value={shift}
                            onChange={e => setShift(e.target.value) }
                            />
                    </div>

                    <div id="PassFormInputBox">
                        <div id="PassFormLabel">Technician</div>
                        <Input
                            placeholder="Technician"
                            value={tech}
                            onChange={e => setTech(e.target.value) }
                            />
                    </div>

                    <div id="PassFormInputBox">
                        <div id="PassFormLabel">Department</div>
                        <Input
                            placeholder="Department"
                            value={depar}
                            onChange={e => setDepar(e.target.value)}
                            />
                    </div>

                    <div id="PassFormInputBox">
                        <div id="PassFormLabel">Date</div>
                        <Space direction="vertical">
                            <DatePicker
                                showToday={"True"}
                                value={dayjs(date)}
                                onChange={onPick}
                                allowClear={false}
                                />
                        </Space>
                    </div>
                </div>

                <div id="PassFormLabel">Passdown</div>
                <div id="PassFormTextBox">
                    <TextArea
                        rows={6}
                        value={pass}
                        placeholder="Passdown"
                        onChange={e => setPass(e.target.value)}
                        />
                </div>

                <div id="PassFormButtonBox">
                    <div id="PassFormBackButton">
                        <Button onClick={backButton}>Back</Button>
                    </div>
                    <div id="PassFormSubmitButton">
                        <Button onClick={addPass}>Submit</Button>
                    </div>
                </div>
                
            </div>
        </ConfigProvider>
    )
}
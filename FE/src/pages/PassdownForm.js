/* eslint-disable no-restricted-globals */
import { useState, useEffect, useRef } from 'react';
import { Button, Input, Space, Table, typography,DatePicker,ConfigProvider } from 'antd';
import { useNavigate, Link } from 'react-router';
import { SearchOutlined } from '@ant-design/icons';
import "./PassdownForm.css"

export default function CreatePassdownPage() {

    const history = useNavigate();
    const [date, setDate] = useState('');
    const [shift, setShift] = useState('');
    const [tech, setTech] = useState('');
    const [depar, setDepar] = useState('');
    const [pass, setPass] = useState('');

    useEffect(() => {
        if (location.state == null) {
            console.log('record is null')
        }
        else {
            console.log(location.state)
            setDate(location.state.record.Date);
            setShift(location.state.record.Shift);
            setTech(location.state.record.Technician);
            setDepar(location.state.record.Department);
            setPass(location.state.record.Passdown);
        };
    }, [])

    const addPass = async () => {
        // Create new object with the variables set in the form
        const newPass = { date, shift, tech, depar, pass };
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
    const onPick = (date, dateString) => {
        //console.log(date, dateString)
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
                    colorPrimary: '#ffffff',
                    colorTextLightSolid: '#000000',
                    colorBorder: '#000000',
                    //lineType: 'default',
                    //lineWidth: '1',
                    colorPrimaryHover: '#6ce3c6'
                },
            }}>
        <div>
                <h1>Passdown Entry</h1>
        <div id="PassFormInfoHeader" />

                {/*<fieldset>
            <label for="Date">Date</label>
            <input id="date"
                type="datetime-local"
                value={date}
                onChange={e => setDate(e.target.value)}
            /> <br />

           <label for="Shift">Shift</label>
           <input id="shift"
               type="text"
                    value={shift}
               onChange={e => setShift(e.target.value)}
           /> <br />

           <label for="Technician">Technician</label>
           <input id="tech"
               type="text"
               value={tech}
               onChange={e => setTech(e.target.value)}
           /> <br />

           <label for="Department">Department</label>
           <input id="depar"
               type="text"
               value={depar}
               onChange={e => setDepar(e.target.value)}
           /> <br />

           <label for="PassDown">PassDown</label>
           <input id="pass"
               type="text"
               value={pass}
               onChange={e => setPass(e.target.value)}
           /> <br />
           <Button type="primary" onClick={addPass}> Submit </Button>
        </fieldset>*/}
        <div id="PassFormCard">
                    <div id="PassFormInputBox">
                        <div id="PassFormLabel">Shift</div>
                        <Input placeholder="Shift" value={shift}  onChange={e => setShift(e.target.value) } />
                    </div>

                    <div id="PassFormInputBox">
                        <div id="PassFormLabel">Technician</div>
                        <Input placeholder="Technician" value={tech}  onChange={e => setTech(e.target.value) } />
                    </div>
                    <div id="PassFormInputBox">
                    <div id="PassFormLabel">Department</div>
                        <Input placeholder="Department" value={depar}  onChange={e => setDepar(e.target.value)} />
                    </div>
                    <div id="PassFormInputBox">
                        <div id="PasssFormLabel">Date</div>
                        <Space direction="vertical">
                            <DatePicker value={date} onChange={onPick} />
                        </Space>
                    </div>
                    </div>
                    <div id="PassFormLabel">Passdown</div>
                    <div id="PassFormTextBox">
                    <TextArea rows={6} value={pass} placeholder="Passdown" />
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
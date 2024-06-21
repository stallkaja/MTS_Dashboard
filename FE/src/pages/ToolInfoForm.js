import { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, DatePicker, Space, Input, ConfigProvider, Select } from 'antd';
import "./ToolInfoForm.css";
import dayjs from 'dayjs';
import locations from '../components/LocationList.js'





export default function CreateToolPage() {

	const history = useNavigate();
	const location = useLocation();
	const [manu, setManu] = useState('');
	const [model, setModel] = useState('');
	const [desc, setDesc] = useState('')
	const [serial, setSerial] = useState('')
	const [area, setArea] = useState('');
	const [id, setId] = useState('');
	const [loc, setLoc] = useState('');
	const [caldue, setCaldue] = useState('');
	const [key, setKey] = useState();
    const [curLoc, setCurLoc] = useState('');
    const [com, setCom] = useState('');
    const { TextArea } = Input;
    const [stat, setStat] = useState('Active');


	
	useEffect(() => {
		if (location.state == null) {
			console.log('record is null')
			setCaldue(dayjs().format('YYYY-MM-DD HH:mm:ss'));
			}
		else {
			setId(location.state.record.NVL);
			setManu(location.state.record.ManufacturerName);
			setModel(location.state.record.ModelName);
			setDesc(location.state.record.Description);
			setSerial(location.state.record.SerialNumber);
			setArea(location.state.record.Area);
			setLoc(location.state.record.PermLoc);
			setCaldue(location.state.record.CalibrationDue);
			setKey(location.state.record.PK);
            setCurLoc(location.state.record.CurLoc);
            setCom(location.state.record.Comments);
            setStat(location.state.record.Status)
		};
	}, []) // <-- empty dependency array






	//----------------------------------------------------------------------------
	// Make a POST request to create a new material
	//----------------------------------------------------------------------------
	const addTool = async () => {
		// Create new object with the variables set in the form
		const newTool = { manu, model, desc, serial, area, id, loc, caldue, key, curLoc, com, stat};
		const response = await fetch('/newTool', {
			method: 'POST',
			body: JSON.stringify(newTool),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => {
			if (response.status === 200) {
				alert("Tool has been added!");
				history('/ToolHistory');
			} else {
				alert(`Failed to add tool, status code = ${response.status}`);
			}
		});
		
	}

	const onPick = (date, dateString) => {
		setCaldue(dateString)
	}

	const navigate = useNavigate();
	const backButton = () => {
		let path = '/ToolHistory';
		navigate(path);
	}

    const locChange = (value) => {
        setCurLoc(value)
    }
    const statChange = (value) => {
        setStat(value)
    }



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
			    <h1>Tool Form</h1>
		        <div id="InfoHeader">


			    </div>
			    <div id="FormCard">	
			        <div id="column">
				        <div id="InputBox">
				            <div id="label">ID</div>
					        <Input 
                                placeholder="ID"
                                value={id}
                                style={{
                                    width: '275px'
                                }}
                                showCount='true'
                                maxLength='100'
                                onChange={e => setId(e.target.value)}
                            />
				        </div>

				        <div id="InputBox">
				            <div id="Label">Manufacturer Name</div>
					        <Input
                                placeholder="Manufacturer Name"
                                value={manu}
                                style={{
                                    width: '275px'
                                }}
                                onChange={e => setManu(e.target.value) }
                                showCount='true'
                                maxLength='100'
                            />
					    </div>

				        <div id="InputBox">
				            <div id="Label">Model Name</div>
						    <Input
                                placeholder="Model Name"
                                value={model}
                                style={{
                                    width: '275px'
                                }}
                                onChange={e => setModel(e.target.value) }
                                showCount='true'
                                maxLength='100'
                            />
				        </div>

                    </div>

				    <div id="column">
				        <div id="InputBox">
				            <div id="Label">Description</div>
						    <Input 
                                placeholder="Description"
                                value={desc}
                                style={{
                                    width: '275px'
                                }}
                                onChange={e => setDesc(e.target.value) }
                                showCount='true'
                                maxLength='100'
                            />
					    </div>

				        <div id="InputBox">
				            <div id="Label">Serial Number</div>
						    <Input
                                placeholder="Serial Number"
                                value={serial}
                                style={{
                                    width: '275px'
                                }}
                                onChange={e => setSerial(e.target.value)}
                                showCount='true'
                                maxLength='100'
                            />
					    </div>

					    <div id="InputBox">
				            <div id="Label">Area</div>
						    <Input
                                placeholder="Area"
                                value={area}
                                style={{
                                    width: '275px'
                                }}
                                onChange={e => setArea(e.target.value) }
                                showCount='true'
                                maxLength='100'
                            />
					    </div>
                    </div>

				    <div id="column">
					    <div id="InputBox">
				            <div id="Label">Location</div>
						    <Input
                                placeholder="Location"
                                value={loc}
                                style={{
                                    width: '275px'
                                } }
                                onChange={e => setLoc(e.target.value) }
                                showCount='true'
                                maxLength='100'
                            />
				        </div>

					    <div id="InputBox">
				            <div id="Label">Calibration Due Date</div>
				            <Space direction="vertical">
						        <DatePicker
                                    style={{
                                        width: '275px'
                                    } }
                                    value={dayjs(caldue)}
                                    onChange={onPick}
                                    allowClear={false}
                                />
				            </Space>
				
					    </div>
                    </div>

                    <div id="column">
                        <div id="InputBox">
                            <div id="Label">Current Location</div>
                            <Select
                                showSearch
                                style={{
                                    width: '275px'
                                }}
                                value={curLoc}
                                onChange={locChange}
                                placeholder="Current Location"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={locations}
                             />
                        </div>

                        <div id="InputBox">
                            <div id="Label">Tool Status</div>
                            <Select
                                showSearch
                                style={{
                                    width: '275px'
                                }}
                                value={stat}
                                onChange={statChange}
                                placeholder="Tool Status"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={[
                                    {
                                        value: 'Active',
                                        label: 'Active',
                                    },
                                    {
                                        value: 'Inactive',
                                        label: 'Inactive',
                                    }]
                                }
                            />
                        </div>
			        </div>
                </div>
                <div id="CommentsBox">
                    <div id="Label">Comments</div>
                    <TextArea
                        rows={6}
                        value={com}
                        placeholder="Comments"
                        onChange={e => setCom(e.target.value)}
                    />
                </div>
			    <br />

			    <div id="ToolButtonBox">
				    <div id="BackButton">
					    <Button onClick={backButton}> Back</Button>
				    </div>

				    <div id="SubmitButton">
					    <Button onClick={addTool}> Submit </Button>
				    </div>					
			    </div>
		    </div>
		</ConfigProvider>
	)
}
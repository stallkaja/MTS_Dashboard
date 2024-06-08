import { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, DatePicker, Space, Input, ConfigProvider, Select } from 'antd';
import "./ToolInfoForm.css";
import dayjs from 'dayjs';




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
	const [key, setKey] = useState('');
    const [curLoc, setCurLoc] = useState('');
    const [com, setCom] = useState('');
    const { TextArea } = Input;


	
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
            setCurLoc(location.state.record.CurLoc)
            setCom(location.state.record.Comments)
		};
	}, []) // <-- empty dependency array






	//----------------------------------------------------------------------------
	// Make a POST request to create a new material
	//----------------------------------------------------------------------------
	const addTool = async () => {
		// Create new object with the variables set in the form
		const newTool = { manu, model, desc, serial, area, id, loc, caldue, key, curLoc, com};
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
        console.log(curLoc)
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
                                onChange={e => setId(e.target.value)}
                            />
				        </div>

				        <div id="InputBox">
				            <div id="Label">Manufacturer Name</div>
					        <Input
                                placeholder="Manufacturer Name"
                                value={manu}
                                onChange={e => setManu(e.target.value) }
                            />
					    </div>

				        <div id="InputBox">
				            <div id="Label">Model Name</div>
						    <Input
                                placeholder="Model Name"
                                value={model}
                                onChange={e => setModel(e.target.value) }
                            />
				        </div>
                    </div>

				    <div id="column">
				        <div id="InputBox">
				            <div id="Label">Description</div>
						    <Input 
                                placeholder="Description"
                                value={desc}
                                onChange={e => setDesc(e.target.value) }
                            />
					    </div>

				        <div id="InputBox">
				            <div id="Label">Serial Number</div>
						    <Input
                                placeholder="Serial Number"
                                value={serial}
                                onChange={e => setSerial(e.target.value) }
                            />
					    </div>

					    <div id="InputBox">
				            <div id="Label">Area</div>
						    <Input
                                placeholder="Area"
                                value={area}
                                onChange={e => setArea(e.target.value) }
                            />
					    </div>
                    </div>

				    <div id="column">
					    <div id="InputBox">
				            <div id="Label">Location</div>
						    <Input
                                placeholder="Location"
                                value={loc}
                                onChange={e => setLoc(e.target.value) }
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

                        <div id="InputBox">
                            <div id="Label">Current Location</div>
                            <Select
                                showSearch
                                style={{
                                    width: '275px'
                                } }
                                value={curLoc}
                                onChange={locChange}
                                placeholder="Current Location"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={[
                                    {
                                        value: 'SENT',
                                        label: 'SENT',
                                    },
                                    {
                                        value: 'STAHLWILLE/REPAIR',
                                        label: 'STAHLWILLE/REPAIR',
                                    },
                                    {
                                        value: 'OUTGOING',
                                        label: 'OUTGOING',
                                    },
                                    {
                                        value: 'CTU CAL CAB',
                                        label: 'CTU CAL CAB',
                                    },
                                    {
                                        value: 'SPFT',
                                        albel: 'SPFT',
                                    },
                                    {
                                        value: 'SPA',
                                        label: 'SPA',
                                    },
                                    {
                                        value: 'SPAF',
                                        label: 'SPAF',
                                    },
                                    {
                                        value: 'UPGRADES',
                                        label: 'UPGRADES',
                                    },
                                    {
                                        value: 'PRESHIP',
                                        label: 'PRESHIP',
                                    },
                                    {
                                        value: 'SUBFAB',
                                        label: 'SUBFAB',
                                    },
                                    {
                                        value: 'SPL',
                                        label: 'SPL',
                                    },
                                    {
                                        value: 'SPLD',
                                        label: 'SPLD',
                                    },
                                    {
                                        value: 'BCP/QUARANTINED',
                                        label: 'BCP/QUARANTINED',
                                    },
                                    {
                                        value: 'MFE',
                                        label: 'MFE',
                                    },
                                    {
                                        value: 'TWK #',
                                        label: 'TWK #',
                                    },
                                    {
                                        value: 'PHF1/SPAF',
                                        label: 'PHF1/SPAF',
                                    },
                                    {
                                        value: 'PAF6/SPAF',
                                        label: 'PAF6/SPAF',
                                    },
                                    {
                                        value: 'LPDG1/CTU',
                                        label: 'LPDG1/CTU',
                                    },
                                    {
                                        value: 'LPDG2',
                                        label: 'LPDG2',
                                    },
                                    {
                                        value: 'LPDG3',
                                        label: 'LPDG3',
                                    },
                                    {
                                        value: 'LPDG5',
                                        label: 'LPDG5',
                                    },
                                    {
                                        value: 'LRLK1/CTU',
                                        label: 'LRLK1/CTU',
                                    },
                                    {
                                        value: 'LRLK2/CTU',
                                        label: 'LRLK2/CTU',
                                    },
                                    {
                                        value: 'PLF1/SPAF',
                                        label: 'PLF1/SPAF',
                                    },
                                    {
                                        value: 'PLF2/SPAF',
                                        label: 'PLF2/SPAF',
                                    },
                                    {
                                        value: 'TPL1/CTU',
                                        label: 'TPL1/CTU',
                                    },
                                    {
                                        value: 'DOS TICKET',
                                        label: 'DOS TICKET',
                                    },
                                    {
                                        value: 'LOST',
                                        label: 'LOST',
                                    },
                                    {
                                        value: 'PAF1',
                                        label: 'PAF1',
                                    },
                                    {
                                        value: 'LRLK VPM',
                                        label: 'LRLK VPM',
                                    },
                                    {
                                        value: 'PHF3/SPAF',
                                        label: 'PHF3/SPAF',
                                    },
                                    {
                                        value: 'CAL CART 2',
                                        label: 'CAL CART 2',
                                    },
                                    {
                                        value: 'CAL CART 3',
                                        label: 'CAL CART 3',
                                    },
                                    {
                                        value: 'OTHER',
                                        label: 'OTHER',
                                    },
                                    {
                                        value: 'HOIST FIXTURE',
                                        label: 'HOIST FIXTURE',
                                    },
                                    {
                                        value: 'PAF7/SPAF',
                                        label: 'PAF7/SPAF',
                                    },
                                    {
                                        value: 'SFC LOANER',
                                        label: 'SFC LOANER',
                                    },
                                    {
                                        value: 'DUMMY LOAD 1',
                                        label: 'DUMMY LOAD 1',
                                    },
                                    {
                                        value: 'DUMMY LOAD 2',
                                        label: 'DUMMY LOAD 2',
                                    },
                                    {
                                        value: 'DUMMY LOAD 3',
                                        label: 'DUMMY LOAD 3',
                                    },
                                    {
                                        value: 'DUMMY LOAD 4',
                                        label: 'DUMMY LOAD 4',
                                    },
                                    {
                                        value: 'FIXTURES',
                                        label: 'FIXTURES',
                                    },
                                    {
                                        value: '@TRAINING TEAM',
                                        label: '@TRAINING TEAM',
                                    },
                                    {
                                        value: 'PILOT LOANER',
                                        label: 'PILOT LOANER',
                                    },
                                    {
                                        value: 'LOANER TOOL',
                                        label: 'LOANER TOOL',
                                    }
                                ]}
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
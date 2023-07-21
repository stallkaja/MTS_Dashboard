import { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, DatePicker, Space, Input, ConfigProvider } from 'antd';
import "./ToolInfoForm.css";




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

	useEffect(() => {
		if (location.state == null) {
			console.log('record is null')
			}
		else {
			setManu(location.state.record.ManufacturerName);
			setModel(location.state.record.ModelName);
			setDesc(location.state.record.Description);
			setSerial(location.state.record.SerialNumber);
			setArea(location.state.record.Area);
			setId(location.state.record.ID);
			setLoc(location.state.record.Location);
			setCaldue(location.state.record.CalibrationDue);
		};
	}, []) // <-- empty dependency array






	//----------------------------------------------------------------------------
	// Make a POST request to create a new material
	//----------------------------------------------------------------------------
	const addTool = async () => {
		// Create new object with the variables set in the form
		const newTool = { manu, model, desc, serial, area, id, loc, caldue};
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
		//console.log(date, dateString)
		setCaldue(dateString)
	}
	const navigate = useNavigate();
	const backButton = () => {
		let path = '/ToolHistory';
		navigate(path);
	}



	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#ffffff',
					colorTextLightSolid: '#000000',
					colorBorder: '#000000',
					//lineType: 'default',
					//lineWidth: '1',
					colorPrimaryHover: '#e6e3dc'
				},
			}}>
		<div>
			<h1>Tool Form</h1>
				<div id="InfoHeader">
					<div id="BackButton">
						<Button type="primary" onClick={backButton}> Back</Button>
					</div>
					<div id="SubmitButton">
						<Button type="primary" onClick={addTool}> Submit </Button>
					</div>

				</div>
				<div id="FormCard">
					
					<div id="column">
				<div id="InputBox">
				<div id="label">ID</div>
				<Input placeholder="ID" onChange={e => setId(e.target.value)} />
						
				</div>
						<div id="InputBox">
				<div id="Label">Manufacturer Name</div>
					<Input placeholder="Manufacturer Name" onChange={e => setManu(e.target.value) } />
					</div>
				<div id="InputBox">
				<div id="Label">Model Name</div>
				<Input placeholder="Model Name" onChange={e => setModel(e.target.value) } />
					</div></div>
					<div id="column">
				<div id="InputBox">
				<div id="Label">Description</div>
					<Input placeholder="Description" onChange={e => setDesc(e.target.value) } />
					</div>

				<div id="InputBox">
				<div id="Label">Serial Number</div>
					<Input placeholder="Serial Number" onChange={e => setSerial(e.target.value) } />
					</div>

						<div id="InputBox">
				<div id="Label">Area</div>
					<Input placeholder="Area" onChange={e => setArea(e.target.value) } />
					</div></div>
					<div id="column">
						<div id="InputBox">
				<div id="Label">Location</div>
					<Input placeholder="Location" onChange={e => setLoc(e.target.value) } />
				</div>

						<div id="InputBox">
				<div id="Label">Calibration Due Date</div>
				<Space direction="vertical">
					<DatePicker onChange={onPick} />
				</Space>
				
				</div></div>


					
			</div>

			</div>
		</ConfigProvider>
	)
}
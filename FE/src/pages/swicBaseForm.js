import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Input, Select, Space, ConfigProvider } from 'antd';
import "./swicBaseForm.css";



export default function CreateToolPage() {

	const history = useNavigate();
	const location = useLocation();
	const [logStatus, setLogStatus] = useState('New Release');
	const [portLocation, setPortLocation] = useState(' ');
	const [ben, setBen] = useState('')
	const [systemNotes, setSystemNotes] = useState('')
	const [customerFab, setCustomerFab] = useState('');

	useEffect(() => {
		console.log(location)
		console.log(location.state)
		if (location.state == null) {
			console.log('record is null')
		}
		else {
			setLogStatus(location.state.record.LogStatus);
			setPortLocation(location.state.record.PortLocation);
			setBen(location.state.record.BEN);
			setSystemNotes(location.state.record.SystemNotes);
			setCustomerFab(location.state.record.CustomerFab);
		};
	}, []) // <-- empty dependency array






	//----------------------------------------------------------------------------
	// Make a POST request to create a new swic log
	//----------------------------------------------------------------------------
	const addSwicLog = async () => {
		// Create new object with the variables set in the form
		console.log('log status is: ' + logStatus)
		const newLog = { logStatus, ben, systemNotes, customerFab, portLocation };
		//console.log(newLog)
		const response = await fetch('/newSwicLog', {
			method: 'POST',
			body: JSON.stringify(newLog),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => {
			if (response.status === 200) {
				alert("Log has been added!");
				history('/SwicBase');
			} else {
				alert(`Failed to add Log, status code = ${response.status}`);
			}
		});

	}
	const navigate = useNavigate();
	const backButton = () => {
		let path = '/SwicBase';
		navigate(path);
	}
	const handleChange = (value) => {
		setLogStatus(value)
	}
	const handleChanges = (value) => {
		setPortLocation(value)
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
				<h1>SWIC Base Form</h1>
				<div id="SWICHeader" />

				<div id="SwicFormCard">
					<div id="SwicInputBox">
						<div id="SwicLabel">BEN</div>
						<Input placeholder="BEN" value={ben} onChange={e => setBen(e.target.value)} />

						<div id="SwicInputBox">
						<div id="SwicLabel">Customer & Fab</div>
						<Input placeholder=" " value={customerFab} onChange={e => setCustomerFab(e.target.value)} />
					</div>
					</div>
					
					<div id="SwicInputBox">
					<div id="SwicLabel">Status</div>

						<Select
							defaultValue="New Release"
							value={logStatus}
							onChange={handleChange}
							options={[
								{ value: 'New Release', label: 'New Release', },
								//{ value: 'inProgress', label: 'In Progress', },
								{ value: 'Work In Progress', label: 'Work In Progress', },
								{ value: 'Complete', label: 'Complete', },
								{ value: 'Archived', label: 'Archived', },
							]}
						/>

                        <div id="SwicInputBox">
						<div id="SwicLabel">Port Location</div>
						<Select
							defaultValue=" "
							value={portLocation}
							onChange={handleChanges}
							options={[
								{ value: 'Port 1', label: 'Port 1', },
								{ value: 'Port 2', label: 'Port 2', },
								{ value: 'Port 3', label: 'Port 3', },
								{ value: 'Port 4', label: 'Port 4', },
								{ value: 'Sabre 3D PM A', label: 'Sabre 3D PM A', },
								{ value: 'Sabre 3D PM B', label: 'Sabre 3D PM B', },
								{ value: 'Sabre 3D PPT', label: 'Sabre 3D PPT', },
								{ value: 'Sabre Anneal', label: 'Sabre Anneal', },
								{ value: 'Sabre VPM', label: 'Sabre VPM', },
								{ value: 'Standalone/Handler', label: 'Standalone/Handler', },
							]}
						/>
					</div>
					</div>
					
				</div>

				<div id="SwicLabel">System Notes</div>
				<div id="SwicTextBox">
					<TextArea rows={4} value={systemNotes} placeholder=" " onChange={e => setSystemNotes(e.target.value)} />
				</div>


				<div id="SwicButtonBox">
					<div id="SwicBackButton">
						<Button onClick={backButton}>Back</Button>
					</div>

					<div id="SwicSubmitButton">
						<Button onClick={addSwicLog}> Save </Button>
					</div>
				</div>



			</div>
		</ConfigProvider>
	)
}
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Input, Select, Space, ConfigProvider } from 'antd';
import "./swicBaseForm.css";



export default function CreateToolPage() {

	const history = useNavigate();
	const location = useLocation();
	const [ticketStatus, setTicketStatus] = useState('Open');
	const [ticketNum, setTicketNum] = useState('new ticket');
	const [ben, setBen] = useState('')
	const [ticketDescription, setTicketDescription] = useState('')
	const [department, setDepartment] = useState('');
	const [toolBay, setToolBay] = useState('');

	useEffect(() => {
		console.log(location)
		console.log(location.state)
		if (location.state == null) {
			console.log('record is null')
		}
		else {
			setTicketStatus(location.state.record.TicketStatus);
			setTicketNum(location.state.record.TicketNum);
			setBen(location.state.record.BEN);
			setTicketDescription(location.state.record.TicketDescription);
			setDepartment(location.state.record.Department);
			setToolBay(location.state.record.ToolBay);
		};
	}, []) // <-- empty dependency array






	//----------------------------------------------------------------------------
	// Make a POST request to create a new material
	//----------------------------------------------------------------------------
	const addTicket = async () => {
		// Create new object with the variables set in the form
		console.log('ticket status is: ' + ticketStatus)
		const newTicket = { ticketStatus, ticketNum, ben, ticketDescription, department, toolBay };
		console.log(newTicket)
		const response = await fetch('/newTicket', {
			method: 'POST',
			body: JSON.stringify(newTicket),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => {
			if (response.status === 200) {
				alert("Ticket has been added!");
				history('/TicketDashboard');
			} else {
				alert(`Failed to add Ticket, status code = ${response.status}`);
			}
		});

	}
	const navigate = useNavigate();
	const backButton = () => {
		let path = '/TicketDashboard';
		navigate(path);
	}
	const handleChange = (value) => {
		setTicketStatus(value)
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

				<div id="TickFormCard">
					<div id="TickInputBox">
						<div id="TickLabel">Ticket Status</div>

						<Select
							defaultValue="Open"
							value={ticketStatus}
							onChange={handleChange}
							options={[
								{ value: 'Open', label: 'Open', },
								//{ value: 'inProgress', label: 'In Progress', },
								{ value: 'Closed', label: 'Closed', },
							]}
						/>
					</div>

					<div id="TickInputBox">
						<div id="TickLabel">Ticket Number</div>
						<Input readonly={1} placeholder="Ticket Number" value={ticketNum} onChange={e => setTicketNum(e.target.value)} />
					</div>

					<div id="TickInputBox">
						<div id="TickLabel">BEN</div>
						<Input placeholder="BEN" value={ben} onChange={e => setBen(e.target.value)} />
					</div>

					<div id="TickInputBox">
						<div id="TickLabel">Department</div>
						<Input placeholder="Department" value={department} onChange={e => setDepartment(e.target.value)} />
					</div>

					<div id="TickInputBox">
						<div id="TickLabel">Tool Bay</div>
						<Input placeholder="Tool Bay" value={toolBay} onChange={e => setToolBay(e.target.value)} />
					</div>
				</div>

				<div id="TickLabel">Ticket Description</div>
				<div id="TickTextBox">
					<TextArea rows={6} value={ticketDescription} placeholder="Description" onChange={e => setTicketDescription(e.target.value)} />
				</div>


				<div id="TickButtonBox">
					<div id="TickBackButton">
						<Button onClick={backButton}>Back</Button>
					</div>

					<div id="TickSubmitButton">
						<Button onClick={addTicket}> Save </Button>
					</div>
				</div>



			</div>
		</ConfigProvider>
	)
}
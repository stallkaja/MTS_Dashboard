import { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';




export default function CreateToolPage() {

	const history = useNavigate();
	const location = useLocation();
	const [ticketStatus, setTicketStatus] = useState('Open');
	const [ticketNum, setTicketNum] = useState('');
	const [ben, setBen] = useState('')
	const [ticketDescription, setTicketDescription] = useState('')
	const [department, setDepartment] = useState('');
	const [toolBay, setToolBay] = useState('');

	useEffect(() => {
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
		const newTicket = { ticketStatus, ticketNum, ben, ticketDescription, department, toolBay};
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



	return (
		<div>
			<h1>Ticket Form</h1>

			<fieldset>
				<label for="TicketStatus">Ticket Status</label>
				<select name="ticketStatus" id="TicketStatus" onChange={e => {setTicketStatus(e.target.value);}}>
  				<option value="Open">Open</option>
  				{/* <option value="inProgress">In Progress</option> */}
  				<option value="Closed">closed</option>
				</select>
				<br />

				<label for="ticketNum">Ticket Num</label>
				<input id="ticketNum"
					type="text"
					value={ticketNum}
					onChange={e => setTicketNum(e.target.value)}
				/> <br />

				<label for="ben">BEN</label>
				<input id="Ben"
					type="text"
					value={ben}
					onChange={e => setBen(e.target.value)}
				/> <br />

				<label for="ticketDescription">Ticket Description</label>
				<input id="ticketDescription"
					type="text"
					value={ticketDescription}
					onChange={e => setTicketDescription(e.target.value)}
				/> <br />

				<label for="department">Department</label>
				<input id="department"
					type="text"
					value={department}
					onChange={e => setDepartment(e.target.value)}
				/> <br />

				<label for="toolBay">Tool Bay</label>
				<input id="toolBay"
					type="text"
					value={toolBay}
					onChange={e => setToolBay(e.target.value)}
				/> <br />
				<button onClick={addTicket}> Submit </button>

			</fieldset>

		</div>
	)
}
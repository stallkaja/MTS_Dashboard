import { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';




export default function CreateToolPage() {

	const history = useNavigate();
	const location = useLocation();
	console.log(location);
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
			setManu(location.state.record['Manufacturer Name']);
			setModel(location.state.record['Model Name']);
			setDesc(location.state.record.Description);
			setSerial(location.state.record['Serial Number']);
			setArea(location.state.record.Area);
			setId(location.state.record.ID);
			setLoc(location.state.record.Location);
			setCaldue(location.state.record['Calibration Due']);
		};
	}, []) // <-- empty dependency array






	//----------------------------------------------------------------------------
	// Make a POST request to create a new material
	//----------------------------------------------------------------------------
	const addTool = async () => {
		// Create new object with the variables set in the form
		const newTool = { manu, model, desc, serial, area, id, loc, caldue,};
		const response = await fetch('/newTool', {
			method: 'POST',
			body: JSON.stringify(newTool),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => {
			if (response.status === 200) {
				alert("Tool has been added!");
				history.push("/ToolHistoryPage");
			} else {
				alert(`Failed to add tool, status code = ${response.status}`);
			}
		});
		this.props.history.push('</ToolHistoryPage>')
	}



	return (
		<div>
			<h1>Tool Form</h1>

			<fieldset>
				<label for="name">Manufacturer Name</label>
				<input id="manu"
					type="text"
					value={manu}
					onChange={e => setManu(e.target.value)}
				/> <br />

				<label for="Model Name">Quantity</label>
				<input id="model"
					type="text"
					value={model}
					onChange={e => setModel(e.target.value)}
				/> <br />

				<label for="Description">Description</label>
				<input id="desc"
					type="text"
					value={desc}
					onChange={e => setDesc(e.target.value)}
				/> <br />

				<label for="Serial Number">Serial Number</label>
				<input id="serial"
					type="text"
					value={serial}
					onChange={e => setSerial(e.target.value)}
				/> <br />

				<label for="Area">Area</label>
				<input id="area"
					type="text"
					value={area}
					onChange={e => setArea(e.target.value)}
				/> <br />

				<label for="ID">ID</label>
				<input id="id"
					type="text"
					value={id}
					onChange={e => setId(e.target.value)}
				/> <br />

				<label for="Location">Location</label>
				<input id="loc"
					type="text"
					value={loc}
					onChange={e => setLoc(e.target.value)}
				/> <br />

				<label for="Calibration Due Date">Calibration Due Date</label>
				<input id="caldue"
					type="text"
					value={caldue}
					onChange={e => setCaldue(e.target.value)}
				/> <br />
				




				<button onClick={addTool}> Submit </button>

			</fieldset>

		</div>
	)
}
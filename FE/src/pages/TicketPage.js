import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';



export default function CreateMaterialPage() {

	const history = useNavigate();
	const location = useLocation();
	console.log(location.state.record)	
	// Variables which are initialized to empty string and updated by form below
	const [name, setName] = useState('');
	const [qty, setQty] = useState('');
	const [stat, setStat] = useState('available')
	const [cat, setCat] = useState('cable')
	const [date, setDate] = useState('');
	const [asset, setAsset] = useState('');
	const [part, setPart] = useState('');
	const [serial, setSerial] = useState('');
	const [note, setNote] = useState('');
	const [loc, setLoc] = useState('');
	const [nvl, setNvl] = useState('');

	
	//----------------------------------------------------------------------------
	// Make a POST request to create a new material
	//----------------------------------------------------------------------------
	const addMaterial = async () => {
	  // Create new object with the variables set in the form
	  const newMaterial = {name, qty, stat, cat, asset, part, serial, note, loc, date, nvl};
	  const response = await fetch('/newMaterial', {
		method: 'POST',
		body: JSON.stringify(newMaterial),
		headers: {
		  'Content-Type': 'application/json'
		}
	  }).then(response =>{
		if (response.status === 200) {
			alert("Material has been added!");
			history.push("/MaterialListPage");
		} else {
			alert(`Failed to add material, status code = ${response.status}`);
		}
	  });
	  this.props.history.push('</MaterialListPage>')
}



	return (
	  <div>
		<h1>Input Material Form</h1>
  
		  <fieldset>
			<label for="name">Material Name</label> 
			<input id="name"
			  type="text"
			  value={name}
			  onChange={e => setName(e.target.value)}
			/> <br/>
  
			<label for="qty">Quantity</label> 
			<input id="qty"
			  type="number"
			  min="0"
			  value={qty}
			  onChange={e => setQty(e.target.value)}
			/> <br/>

			<label for="stat">Current State</label>
				<select id="statdropdown" onChange={() => setStat(document.getElementById('statdropdown').value)}>
				<option value="available">Available To Loan</option>
				<option value="clean">Cleanroom Item</option>
				<option value="dos">In DOS for Repair</option>
				<option value="gis">In GIS for Repair</option>
				<option value="lost">Missing or Lost</option>
				<option value="loan">On Loan Offsite</option>
				<option value="due">Past Due</option>
				<option value="retired">Retired or Out of Service</option>
				<option value="unavailable">Unavailable to Loan</option>				 
			</select> <br/>
				
			<label for="cat">Category</label>
				<select id="catdropdown" onChange={() => setCat(document.getElementById('catdropdown').value) }>
				<option value="cable">Cables</option>
				<option value="dum">Dummy Load</option>
				<option value="flir">FLIR Gun</option>
				<option value="fackit">Facilites Kit</option>
				<option value="gbe">GBE</option>
				<option value="leak">Leak Checker</option>
				<option value="lift">Lift Pin Set</option>
				<option value="other">Other-Provide Description</option>
				<option value="cart">SWIC Cart</option>
				<option value="sdev">SWIC Spare Device</option>
				<option value="thumb">SWIC Thumb Drive</option>
				<option value="virus">SWIC Trend Micro Virus Scan Device</option>
				<option value="lap">SWIC-Supported GIS Laptop</option>
				<option value="spinfix">Spindle Fixture</option>
				<option value="spinscrew">Spindle Screw Set</option>
				<option value="gauge">Tools-Gauges and Levels</option>
				<option value="hand">Tools-Non Calibrated Hand Tools</option>
				<option value="meter">Tools-Meters & Pendants</option>
				<option value="torque">Tools-Torque Wrench</option>
				<option value="vi">VI Probe Kit</option>
			</select> <br/>
  
			<label for="date">Due Date</label> 
			<input id="date"
			  type="text"
			  value={date}
			  onChange={e => setDate(e.target.value)}
				/> <br/>

			<label for="asset">Asset Tag #</label>
			<input id="asset"
				type="text"
				value={asset}
				onChange={e => setAsset(e.target.value)}
			/> <br/>

			<label for="part">Lam Part #</label>
			<input id="part"
				type="text"
				value={part}
				onChange={e => setPart(e.target.value)}
				/> <br/>

			<label for="serial">Serial Number or Numbers</label>
			<input id="serial"
				type="text"
				value={serial}
				onChange={e => setSerial(e.target.value)}
			/> <br/>

			<label for="note">Additional Notes</label>
			<input id="note"
				type="text"
				value={note}
				onChange={e => setNote(e.target.value)}
			/> <br/>

			<label for="loc">Location</label>
			<input id="loc"
				type="text"
				value={loc}
				onChange={e => setLoc(e.target.value)}
			/> <br/>

			<label for="nvl">NVL #</label>
			<input id="nvl"
				type="text"
				value={nvl}
				onChange={e => setNvl(e.target.value)}
			/> <br/>
  
			
			<button onClick={addMaterial}> Create </button>
  
		  </fieldset>
  
	  </div>
	)
  }
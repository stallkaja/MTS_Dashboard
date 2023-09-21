import { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";
import { Button, Space, Input, Select, ConfigProvider } from 'antd';
import "./CreateMaterialPage.css";

export default function CreateMaterialPage() {

	const history = useNavigate();
	const location = useLocation();
  
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
	const [pk, setPk] = useState('');
	useEffect(() => {
		if (location.state == null) {
			console.log('record is null')
			}
		else {
			setName(location.state.record.MaterialName);
			setQty(location.state.record.Quantity);
			setStat(location.state.record.CurrentState);
			setCat(location.state.record.Category);
			setAsset(location.state.record.AssetNumber);
			setPart(location.state.record.LamPartNumber);
			setSerial(location.state.record.SerialNumber);
			setNote(location.state.record.AdditionalNotes);
			setLoc(location.state.record.Location);
			setNvl(location.state.record.NVL);
            setPk(location.state.record.PK)
			
		};
	}, []) // <-- empty dependency array

	
	//----------------------------------------------------------------------------
	// Make a POST request to create a new material
	//----------------------------------------------------------------------------
	const addMaterial = async () => {
	  	// Create new object with the variables set in the form
		const newMaterial = { name, qty, stat, cat, asset, part, serial, note, loc, nvl, pk };
	  	const response = await fetch('/newMaterial', {
			method: 'POST',
			body: JSON.stringify(newMaterial),
			headers: {
		  	'Content-Type': 'application/json'
		}
	  	}).then(response =>{
		if (response.status === 200) {
			alert("Material has been added!");
			history("/MaterialListPage");
		} else {
			alert(`Failed to add material, status code = ${response.status}`);
		}
	  	});
	  	this.props.history.push('</MaterialListPage>')
    }

    const handleStatus = (value) => {
        setStat(value)
    }

    const handleCatergory = (value) => {
        setCat(value)
    }

    const navigate = useNavigate();
    const backButton = () => {
        let path = '/MaterialListPage';
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
                    colorPrimaryHover: '#6ce3c6'
                },
            }}>
	        <div>
		        <h1>Input Material Form</h1>

                <div id="matHeader" />
  
		        <div id="matFormCard">
                    <div id="matInputBox">
			            <div id="matLabel">Material Name</div> 
			            <Input
			                type="text"
                            placeholder="Material Name"
			                value={name}
			                onChange={e => setName(e.target.value)}
			            />
                    </div>
                    
                    <div id="matInputBox">
			            <div id="matLabel">Quantity</div> 
			            <Input 
			                type="number"
			                min="0"
                            placeholder="Quantity"
			                value={qty}
			                onChange={e => setQty(e.target.value)}
			            />
                    </div>

                    <div id="matInputBox">
			            <div id="matLabel">Current State</div>
                        <Select
                            onChange={handleStatus}
                            value={stat}
                            options={[
                                { value: 'available', label: 'Available to Loan' },
                                { value: 'clean', label: 'Cleanroom Item' },
                                { value: 'dos', label: 'In DOS for repair' },
                                { value: 'gis', label: 'In GIS for repair' },
                                { value: 'lost', label: 'Lost or Missing' },
                                { value: 'loan', label: 'On Load Offsite' },
                                { value: 'due', label: 'Past Due' },
                                { value: 'retired', label: 'Retired or Out of Service' },
                                { value: 'unavailable', label: 'Unavailable to Loan'}
                            ] }
                        />

                    </div>
				    
                    <div id="matInputBox">
			            <div id="matLabel">Category</div>
				        <Select
                            onChange={handleCatergory}
                            value={cat}
                            options={[
                                { value: 'cable', label: 'Cables' },
                                { value: 'dum', label: 'Dummy Load' },
                                { value: 'flir', label: 'FLIR Gun' },
                                { value: 'fackit', label: 'Facilities Kit' },
                                { value: 'gbe', label: 'GBE' },
                                { value: 'leak', label: 'Leak Checker' },
                                { value: 'lift', label: 'Lift Pin Set' },
                                { value: 'other', label: 'Other-Provide Description' },
                                { value: 'cart', label: 'SWIC Cart' },
                                { value: 'sdev', label: 'SWIC Spare Device' },
                                { value: 'thumb', label: 'SWIC Thumb Drive' },
                                { value: 'virus', label: 'SWIC Trend Micro Virus Scan Device' },
                                { value: 'lap', label: 'SWIC-Supported GIS Laptop' },
                                { value: 'spinfix', label: 'Spindle Fixture' },
                                { value: 'spinscrew', label: 'Spindle Screw Kit' },
                                { value: 'gauge', label: 'Tools-Gauges and Levels' },
                                { value: 'hand', label: 'Tools-Non Calibrated Hand Tools'},
                                { value: 'meter', label: 'Tools-Meters & Pendants' },
                                { value: 'torque', label: 'Tools-Calibrated Hand Tools'},
                                { value: 'vi', label: 'VI Probe Kit'}
                            ]}
                        />
                    </div>

                    <div id="matInputBox">
			            <div id="matLabel">Asset Tag #</div>
			            <Input id="asset"
				            type="text"
				            value={asset}
                            placeholder="Asset Tag #"
				            onChange={e => setAsset(e.target.value)}
			            /> 
                    </div>
                </div>

                <div id="matFormCard">
                    <div id="matInputBox">
			            <div id="matLabel">Lam Part #</div>
			            <Input
				            type="text"
				            value={part}
                            placeholder="Lam Part #"
				            onChange={e => setPart(e.target.value)}
				        />
                    </div>

                    <div id="matInputBox">
			            <div id="matLabel">Serial Number or Numbers</div>
			            <Input
				            type="text"
				            value={serial}
                            placeholder="Serial Number"
				            onChange={e => setSerial(e.target.value)}
			            /> 
                    </div>

                    <div id="matInputBox">
			            <div id="matLabel">Location</div>
			            <Input
                            placeholder="Location"
				            type="text"
				            value={loc}
				            onChange={e => setLoc(e.target.value)}
			            /> 
                    </div>

                    <div id="matInputBox">
			            <div id="matLabel">NVL #</div>
			            <Input 
                            placeholder="NVL #"
				            type="text"
				            value={nvl}
				            onChange={e => setNvl(e.target.value)}
			            /> 
                    </div>
                </div>
                <div id="matTextBox">
                    
                    <label for="note">Additional Notes</label>
                    <TextArea
                        rows={6}
                        value={note}
                        placeholder="Additional Notes"
                        onChange={e => setNote(e.target.value)}
                    /> 
                </div>
  
                <div id="matButtonBox">
                    <div id="matBackButton">
                        <Button onClick={backButton}> Back </Button>
                    </div>
                    <div id="matSubmitButton">
			            <Button onClick={addMaterial}> Save </Button>
		            </div>
                </div>
	        </div>
      </ConfigProvider>
	) 
}
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Alert, Calendar, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const PtoRequestForm = () => {
    const history = useNavigate();
	const location = useLocation();
    const [value, setValue] = useState(() => dayjs('2017-01-25'));
    const [selectedValue, setSelectedValue] = useState(() => dayjs('2017-01-25'));
    const [name, setName] = useState('');
    const onSelect = (newValue) => {
      setValue(newValue);
      setSelectedValue(newValue);
    };
    const onPanelChange = (newValue) => {
      setValue(newValue);
    };
    const submitRequest = async () => {
		// Create new object with the variables set in the form

		const newRequest = {selectedValue, name};
		const response = await fetch('/ptoRequest', {
			method: 'POST',
			body: JSON.stringify(newRequest),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => {
			if (response.status === 200) {
				alert("Request Submitted!");
				history('/');
			} else {
				alert(`Failed to add Ticket, status code = ${response.status}`);
			}
		});
		
	}
    return (
      <>
        <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
        <label for="name">Name</label> 
			<input id="name"
			  type="text"
			  value={name}
			  onChange={e => setName(e.target.value)}
			/>
        <Button onClick={submitRequest}> Submit </Button>
        <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} />
      </>
    );
}

export default PtoRequestForm;
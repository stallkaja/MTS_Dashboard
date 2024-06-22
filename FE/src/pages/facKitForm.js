import { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Input, Select, Space, ConfigProvider } from 'antd';
import "./TicketPage.css";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);



export default function FacKitForm() {

	const history = useNavigate();
	const location = useLocation();
	const [PK, setPK] = useState();


	useEffect(() => {
		if (location.state == null) {
			console.log('record is null')
			}
		else {
			setPK(location.state.record.PK);

		};
	}, []) // <-- empty dependency array


	//----------------------------------------------------------------------------
	// Make a POST request to create a new material
	//----------------------------------------------------------------------------
	const addFacKit = async () => {
		// Create new object with the variables set in the form
		const newKit = {};
		const response = await fetch('/newFacKit', {
			method: 'POST',
			body: JSON.stringify(newKit),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => {
			if (response.status === 200) {
				alert("newKit has been added!");
				history('/facKitPage');
			} else {
				alert(`Failed to add newKit, status code = ${response.status}`);
			}
		});
		
	}
	const navigate = useNavigate();
	const backButton = () => {
		let path = '/facKitPage';
		navigate(path);
	}
	const handleChange = (value) => {
		//setTicketStatus(value)
	}


	// const { TextArea } = Input; this is needed for the table and drop down table but doesnt work bc page is still WIP.

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
				<h1>Facility Kit Form</h1>
			</div>

		</ConfigProvider>
	)
}
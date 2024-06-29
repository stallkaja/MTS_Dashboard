import { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Input, Select, Space, ConfigProvider, Collapse } from 'antd';
import "./facKitForm.css";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);



export default function FacKitForm() {
    const { TextArea } = Input;
	const history = useNavigate();
	const location = useLocation();
	const [PK, setPK] = useState();
    const [ben, setBen] = useState();
    const [stat, setStat] = useState();
    const [kit1Num, setKit1Num] = useState();
    const [kit2Num, setKit2Num] = useState();
    const [kit3Num, setKit3Num] = useState();
    const [avKits, setAvKits] = useState([]);
    const [com, setCom] = useState();

    const statuses = [
        { value: 'New', label: 'New' },
        { value: 'Built', label: 'Built'},
        { value: 'Inspected', label: 'Inspected' },
        { value: 'Issued', label: 'Issued'},
        { value: 'Returned', label: 'Returned'},
        { value: 'Completed', label: 'Completed' }
    ]



	useEffect(() => {
		if (location.state == null) {
			console.log('record is null')
            setStat('New')
			}
		else {
			setPK(location.state.record.PK);
            setBen(location.state.record.ben)
            setStat(location.state.record.state)

		};
	}, []) // <-- empty dependency array


	//----------------------------------------------------------------------------
	// Make a POST request to create a new material
	//----------------------------------------------------------------------------
	const addFacKit = async () => {
		// Create new object with the variables set in the form
		const newKit = { stat, ben, kit1Num, kit2Num, kit3Num, com};
		const response = await fetch('/newFacKit', {
			method: 'POST',
			body: JSON.stringify(newKit),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => {
			if (response.status === 200) {
				alert("newKit has been added!");
				history('/KitBasePage');
			} else {
				alert(`Failed to add newKit, status code = ${response.status}`);
			}
		});
		
	}
    const kitList = async () => {
        const kitList = []
        const response = await fetch('/loadKitNumbers', {
            headers: {
                'Content-Type': 'application/json'
            }

        }).then((response) => {
            if (response.ok) {
                response.json().then((responseData) => {
                    for (let i = 0; i < responseData.length; i++) {
                        let line = {}
                        line.value = responseData[i]['MaterialName']
                        line.label = responseData[i]['MaterialName'] 
                        kitList.push(line)
                    }
                    setAvKits(kitList)
                })
            }
        });
    }
    useEffect(() => {
        kitList()
    }, []);

	const navigate = useNavigate();
	const backButton = () => {
		let path = '/KitBasePage';
		navigate(path);
	}
	const handleChange = (value) => {
		//setTicketStatus(value)
	}
    const statChange = (value) => {
        setStat(value)
    }
    const kit1Change = (value) => {
        setKit1Num(value)
    }
    const kit2Change = (value) => {
        setKit1Num(value)
    }
    const kit3Change = (value) => {
        setKit1Num(value)
    }

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
                <div id="FormCard">
                    <div id="column">
                        <div id="InputBox">
                            <div id="Label">BEN:</div>
                            <Input
                                placeholder="BEN"
                                value={ben}
                                style={{
                                    width: '275px'
                                }}
                                showCount='true'
                                maxLength='100'
                                onChange={e => setBen(e.target.value)}
                            />
                        </div>

                        <div id="InputBox">
                            <div id="Label">Sales Order</div>
                            X1234
                        </div>

                        <div id="InputBox">
                            <div id="Label">Order Number</div>
                            1234567
                        </div>

                        <div id="InputBox">
                            <div id="Label">Serial Number</div>
                            VXT-1234
                        </div>

                        <div id="InputBox">
                            <div id="Label">Product</div>
                            VXT AHM H
                        </div>

                        <div id="InputBox">
                            <div id="Label">POM</div>
                            123
                        </div>


                    </div>
                    
                    <div id="column">
                        <div id="InputBox">
                            <div id="Label">Kit Status</div>
                            <Select
                                showSearch
                                style={{
                                    width: '275px'
                                }}
                                value={stat}
                                onChange={statChange}
                                placeholder="Kit Status"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={statuses}
                            />
                        </div>

                        <div id="InputBox">
                            <div id="Label">Kit 1#</div>
                            <Select
                                showSearch
                                style={{
                                    width: '275px'
                                }}
                                value={kit1Num}
                                onChange={kit1Change}
                                placeholder="Kit 1#"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={avKits}
                            />
                        </div>

                        <div id="InputBox">
                            <div id="Label">Kit 2#</div>
                            <Select
                                showSearch
                                style={{
                                    width: '275px'
                                }}
                                value={kit2Num}
                                onChange={kit2Change}
                                placeholder="Kit 2#"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={avKits}
                            />
                        </div>

                        <div id="InputBox">
                            <div id="Label">Kit 3#</div>
                            <Select
                                showSearch
                                style={{
                                    width: '275px'
                                }}
                                value={kit3Num}
                                onChange={kit3Change}
                                placeholder="Kit 1#"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={avKits}
                            />
                        </div>

                        <div id="InputBox">
                            

                        </div>
                    </div>
                    
                    {/* }
                    <div id="column">
                        <div id="InputBox">
                            <div id="Label">Current Location</div>
                            <Select
                                showSearch
                                style={{
                                    width: '275px'
                                }}
                                value={curLoc}
                                onChange={locChange}
                                placeholder="Current Location"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={locations}
                            />
                        </div>

                        <div id="InputBox">
                            <div id="Label">Tool Status</div>
                            <Select
                                showSearch
                                style={{
                                    width: '275px'
                                }}
                                value={stat}
                                onChange={statChange}
                                placeholder="Tool Status"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={[
                                    {
                                        value: 'Active',
                                        label: 'Active',
                                    },
                                    {
                                        value: 'Inactive',
                                        label: 'Inactive',
                                    }]
                                }
                            />
                        </div>
                    </div>*/}
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
                        <Button onClick={addFacKit}> Submit </Button>
                    </div>
                </div>
			</div>



		</ConfigProvider>
	)
}
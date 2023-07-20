import { useState, useEffect, useRef } from 'react';
import { Button, Input, Space, Table, typography } from 'antd';
import { useNavigate, Link } from 'react-router';
import { SearchOutlined } from '@ant-design/icons';

export default function CreatePassdownPage() {

    const [date, setDate] = useState('');
    const [shift, setShift] = useState('');
    const [tech, setTech] = useState('');
    const [depar, setDepar] = useState('');
    const [pass, setPass] = useState('');

    const addPass = async () => {
        // Create new object with the variables set in the form
        const newPass = { date, shift, tech, depar, pass };
        const response = await fetch('/newPass', {
            method: 'POST',
            body: JSON.stringify(newPass),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                alert("PassDown has been created!");
                history('/PassDownPage');
            } else {
                alert(`Failed to create PassDown, status code = ${response.status}`);
            }
        });

    }
    return (
        <div>
        <h1> PassDown </h1>

        <fieldset>
            <label for="Date">Date</label>
            <input id="date"
                type="datetime-local"
                value={date}
                onChange={e => setDate(e.target.value)}
            /> <br />

           <label for="Shift">Shift</label>
           <input id="shift"
               type="text"
                    value={shift}
               onChange={e => setShift(e.target.value)}
           /> <br />

           <label for="Technician">Technician</label>
           <input id="tech"
               type="text"
               value={tech}
               onChange={e => setTech(e.target.value)}
           /> <br />

           <label for="Department">Department</label>
           <input id="depar"
               type="text"
               value={depar}
               onChange={e => setDepar(e.target.value)}
           /> <br />

           <label for="PassDown">PassDown</label>
           <input id="pass"
               type="text"
               value={pass}
               onChange={e => setPass(e.target.value)}
           /> <br />
           <Button type="primary" onClick={addPass}> Submit </Button>
        </fieldset>
    </div>
    )
}
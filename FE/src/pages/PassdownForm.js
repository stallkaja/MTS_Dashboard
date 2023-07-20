import { useState, useEffect, useRef } from 'react';
import { Button, Input, Space, Table, typography } from 'antd';
import { useNavigate, Link } from 'react-router';
import { SearchOutlined } from '@ant-design/icons';

export default function CreatePassdownPage() {
    const [date, setDate] = useState('');

    return (
        <div>
        <h1> Hellow </h1>

        <fieldset>
            <label for="Date">Date</label>
            <input id="date"
                type="datetime-local"
                value={date}
                onChange={e => setDate(e.target.value)}
                />
            </fieldset>
    </div>
    )
}
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import '../App.css';

function Form() {
    const [value, setValue] = useState('');
    const handleSelect = (event) => {
        console.log(event);
        setValue(event)
    }
    return (
        <>
            <DropdownButton
                title="1"
                onSelect={handleSelect}
                variant="secondary"
                className="buttonyellow"
            >
                <Dropdown.Item eventKey="black">black</Dropdown.Item>
                <Dropdown.Item eventKey="yellow">yellow</Dropdown.Item>
                <Dropdown.Item eventKey="green">green</Dropdown.Item>
            </DropdownButton>
            <h4>You selected {value}</h4>
        </>
    );
}

export default Form;
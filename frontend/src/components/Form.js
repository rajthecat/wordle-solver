import React, { useState, useRef, useEffect } from 'react';
import '../App'

function Form() {
    const [values, setValues] = useState(['', '', '', '', '']);
    const [selectedColors, setSelectedColors] = useState(['black', 'black', 'black', 'black', 'black']);
    const inputsRef = useRef([]);

    useEffect(() => {
        inputsRef.current[0].focus();
    }, []);

    const handleChange = (index, event) => {
        const newValues = [...values];
        newValues[index] = event.target.value;

        setValues(newValues);

        if (event.target.value !== '' && index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace' && index > 0 && values[index] === '') {
            inputsRef.current[index - 1].focus();
        }
    };

    const handleColorChange = (index, event) => {
        const newSelectedColors = [...selectedColors];
        newSelectedColors[index] = event.target.value;
        setSelectedColors(newSelectedColors);
    };

    return (
        <div>
            <div>
                {values.map((value, index) => (
                    <input
                        key={index}
                        type="text"
                        value={value}
                        onChange={(event) => handleChange(index, event)}
                        onKeyDown={(event) => handleKeyDown(index, event)}
                        maxLength={1}
                        className={`input${selectedColors[index]}`}
                        ref={(el) => inputsRef.current[index] = el}
                    />
                ))}
            </div>
            <div>
                {values.map((value, index) => (
                    <select key={index} value={selectedColors[index]} onChange={(event) => handleColorChange(index, event)}>
                        <option value="black">B</option>
                        <option value="green">G</option>
                        <option value="yellow">Y</option>
                    </select>
                ))}
            </div>
        </div>
    );
}

export default Form;
import React from 'react';
import '../App.css';
import instructions from './instructions.png';

function Instructions() {
    return (
        <table className='info-table'>
            <tbody >
                <tr>
                    <td className='info-text'>
                        <p>Play the nytimes wordle using the official link</p>
                        <p>Input the results from the app when you want help:</p>
                        <ol>
                            <li><p>Enter the guess you used in `Guess:`.</p></li>
                            <li><p>Enter the colors of the result in `Result:`.</p>
                                <p>G = Green - Correct Letter in Correct Position</p>
                                <p>Y = Yellow - Correct Letter in Incorrect Position</p>
                                <p>B = Black - Incorrect Letter</p>
                            </li>
                            <li><p>`Submit` to get a remaining words and letter frequency.</p></li>
                            <li><p>`Reset` to start over.</p></li>
                        </ol>
                    </td>
                    <td className='info-image'>
                        <img src={instructions} alt="Info" />
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default Instructions;
import React, { useState } from 'react';
import '../App.css';
import Instructions from './Instructions'

function Info() {
    const [isHover, setIsHover] = useState(false);

    return (
        <>
            <table className='instructions-table'>
                <tbody>
                    <tr>
                        <td className='info'>
                            <div>
                                <div
                                    onMouseEnter={() => setIsHover(true)}
                                    onMouseLeave={() => setIsHover(false)}
                                >
                                    {isHover && (
                                        <div className='info-instructions'><Instructions /></div>
                                        )}
                                    <p className='instructions'>Instructions</p>
                                </div>
                            </div>
                        </td>
                        <td className='info'>
                            <a href='https://www.nytimes.com/games/wordle/index.html'>Official Wordle</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default Info;
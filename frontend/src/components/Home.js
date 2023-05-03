import React, { useState, useRef, useEffect } from 'react';
import '../App'

function Home() {
    const [guessArray, setGuessArray] = useState(['', '', '', '', '']);
    const [resultArray, setResultArray] = useState(['b', 'b', 'b', 'b', 'b']);
    const inputsRef = useRef([]);
    const [previousGuesses, setPreviousGuesses] = useState([]);
    const [apiResults, setApiResults] = useState({
        words: [],
        message: '',
        letters: []
    });

    useEffect(() => {
        inputsRef.current[0].focus();
        fetchWords();
    }, []);

    const fetchWords = async () => {
        const data = await fetch("/wordl");
        console.log(data.status);
        const json = await data.json();
        setApiResults(json);
    };

    const handleChange = (index, event) => {
        const value = event.target.value;
        const regex = /^[a-zA-Z]+$/;

        if (value === '' || regex.test(value)) {
            const newValues = [...guessArray];
            newValues[index] = value.toUpperCase();

            setGuessArray(newValues);

            if (value !== '' && index < inputsRef.current.length - 1) {
                inputsRef.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace' && index > 0 && guessArray[index] === '') {
            inputsRef.current[index - 1].focus();
        }
    };

    const handleColorChange = (index, event) => {
        const newSelectedColors = [...resultArray];
        newSelectedColors[index] = event.target.value;
        setResultArray(newSelectedColors);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newPreviousGuesses = [...previousGuesses, { 
            guessArray: guessArray, 
            resultArray: resultArray 
        }];
        setPreviousGuesses(newPreviousGuesses);

        const requestOptions = {
            method: "POST",
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    guess: guessArray.join('').toLowerCase(),
                    result: resultArray.join(''),
                    words: apiResults.words
                }
            ),
        };
        console.log(requestOptions);
        const data = await fetch("/wordl", requestOptions);
        const json = await data.json();

        setApiResults(json);
        setGuessArray(['', '', '', '', '']);
        setResultArray(['b', 'b', 'b', 'b', 'b']);
        inputsRef.current[0].focus();
    };

    const handleReset = () => {
        setGuessArray(['', '', '', '', '']);
        setResultArray(['b', 'b', 'b', 'b', 'b']);
        setPreviousGuesses([]);
        fetchWords();
        inputsRef.current[0].focus();
    };

    return (
        <>
            <div>
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    Guess:
                                </td>
                                <td>
                                    {guessArray.map((value, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            value={value}
                                            onChange={(event) => handleChange(index, event)}
                                            onKeyDown={(event) => handleKeyDown(index, event)}
                                            maxLength={1}
                                            className={`input${resultArray[index]}`}
                                            ref={(el) => inputsRef.current[index] = el}
                                        />
                                    ))}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Result:
                                </td>
                                <td>
                                    {guessArray.map((value, index) => (
                                        <select key={index} value={resultArray[index]} className={`input${resultArray[index]}`} onChange={(event) => handleColorChange(index, event)}>
                                            <option value="b" className={`inputb`}>B</option>
                                            <option value="y" className={`inputy`}>Y</option>
                                            <option value="g" className={`inputg`}>G</option>
                                        </select>
                                    ))}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                </td>
                                <td>
                                    <button type="submit" onClick={handleSubmit}>Submit</button>
                                    <button type="button" onClick={handleReset}>Reset</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            <table className='result'>
                <thead>
                    <tr>
                        <th className='result'>
                            Results:
                        </th>
                        <th className='result'>
                            Words: {apiResults.words.length}
                        </th>
                        <th className='result'>
                            Letters: {apiResults.letters.length}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='result'>
                        {previousGuesses.map((previousGuess, index) => (
                            <div key={index}>
                                {previousGuess.guessArray.map((guess, index) => (
                                    <mark key={index} className={`${previousGuess.resultArray[index]}`}>
                                        {guess}
                                    </mark>
                                ))}
                            </div>
                        ))}

                        </td>
                        <td className='result'>
                            {
                                <nav>
                                    <ul>
                                        {apiResults.words.map(function (name, index) {
                                            return <li key={index}>{name}</li>;
                                        })}
                                    </ul>
                                </nav>
                            }
                        </td>
                        <td className='result'>
                            <nav>
                                <ul>
                                    {apiResults.letters.map(letter => {
                                        return <li key={letter.char}>{letter.char} : {letter.count}</li>;
                                    })}
                                </ul>
                            </nav>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p className="App-message">Message: {apiResults.message}</p>
        </>
    );
}

export default Home;
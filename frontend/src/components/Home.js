import React, { useEffect, useState } from "react";
import { Form, Button, ButtonGroup } from 'react-bootstrap';

function Home() {
    useEffect(() => {
        fetchWords();
    }, []);

    const [wordl, setWords] = useState({
        words: [],
        message: '',
        letters: []
    });
    const [state, setState] = useState({
        guess: '',
        result: ''
    });
    const [entered, setEntered] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let coloredEntry = "";
            for (let i = 0; i < state.result.length; i++) {
                switch (state.result[i]) {
                    case 'b':
                        coloredEntry += `<mark class="gray">` + state.guess[i] + `</mark>`;
                        break;
                    case 'g':
                        coloredEntry += `<mark class="green">` + state.guess[i] + `</mark>`;
                        break;
                    case 'y':
                        coloredEntry += `<mark class="yellow">` + state.guess[i] + `</mark>`;
                        break;
                    default:
                        coloredEntry += `<mark class="red">` + state.guess[i] + `</mark>`;
                }

            }
            setEntered([...entered, coloredEntry])
            const requestOptions = {
                method: "POST",
                mode: "cors",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        guess: state.guess,
                        result: state.result,
                        words: wordl.words
                    }
                ),
            };
            const data = await fetch("/wordl", requestOptions);
            const json = await data.json();

            setWords(json);

        } catch (err) {
            console.log(err);
        }
        setState({
            guess: '',
            result: ''
        })
    };

    const onInputChange = event => {
        const { name, value } = event.target;

        setState({
            ...state,
            [name]: value
        });
    };

    const fetchWords = async () => {
        setState({
            guess: '',
            result: ''
        })
        setEntered([]);
        const data = await fetch("/wordl");
        console.log(data.status);
        const json = await data.json();
        setWords(json);
    };

    return (
        <section>
            <div>
                <form onSubmit={handleSubmit}>
                    <Form.Group controlId="guess">
                        <Form.Label>Guess: </Form.Label>
                        <Form.Control
                            type="text"
                            name="guess"
                            maxLength="5"
                            value={state.guess}
                            placeholder="Enter the guess"
                            onChange={onInputChange}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group controlId="result">
                        <Form.Label>Result: </Form.Label>
                        <Form.Control
                            type="text"
                            name="result"
                            maxLength="5"
                            value={state.result}
                            placeholder="bbygb"
                            onChange={onInputChange}
                        />
                    </Form.Group>
                    <ButtonGroup>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Button variant="secondary" type="reset" onClick={fetchWords}>
                            Reset
                        </Button>
                    </ButtonGroup>
                </form>
            </div>
            {
                <>
                    <div className="row">
                        <div className="column">
                            <p>Results:</p>
                            {
                                <ul>
                                    {entered.map((entry, index) => {
                                        return <li key={index}><div className="content" dangerouslySetInnerHTML={{ __html: entry }}></div></li>;
                                    })}
                                </ul>
                            }
                        </div>
                        <div className="column">
                            <p>Words: {wordl.words.length} </p>{
                                <nav>
                                    <ul>
                                        {wordl.words.map(function (name, index) {
                                            return <li key={index}>{name}</li>;
                                        })}
                                    </ul>
                                </nav>
                            }
                        </div>
                        <div className="column">
                            <p>Letters: {wordl.letters.length} </p>{
                                <nav>
                                    <ul>
                                        {wordl.letters.map(letter => {
                                            return <li key={letter.char}>{letter.char} : {letter.count}</li>;
                                        })}
                                    </ul>
                                </nav>
                            }
                        </div>
                    </div>
                    <p className="App-message">Message: {wordl.message}</p>
                </>
            }
        </section>
    );
}

export default Home;

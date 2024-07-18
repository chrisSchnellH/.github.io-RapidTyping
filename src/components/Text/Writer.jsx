import React, { useEffect, useState } from 'react';
import "./styles.css"
import { StopWatch } from "../Timer/StopWatch";
import { Generator } from '../Generator/Generator';

export const Writer = () => {
    const [input, setInput] = useState('');
    const [inputArr, setInputArr] = useState([]);
    const [coloredText, setColoredText] = useState(null);
    const [finished, setFinished] = useState(false);

    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [generatedText, setGeneratedText] = useState('');

    const textArr = generatedText.split("");

    useEffect(() => {
        if (input.length > inputArr.length) {
            const lastInput = input[input.length - 1];
            setInputArr(copyArr => [...copyArr, lastInput]);
        } else if (input.length < inputArr.length) {
            setInputArr(copyArr => copyArr.slice(0, input.length));
        }

        const updatedColoredText = generatedText.split('').map((char, index) => {
            let color;
            if (index < input.length) {
                color = input[index] === char ? 'green' : 'red';
            }
            return <span key={index} style={{ color: color }}>{char}</span>;
        });
        setColoredText(updatedColoredText);

        if (arraysAreEqual() && input.length === textArr.length) {
            setRunning(false);
            setFinished(true);
        }
    }, [input, inputArr, generatedText]);

    const arraysAreEqual = () => textArr.every((char, index) => char === input.split("")[index]);

    const handleChange = (e) => {
        if (!running && !finished) {
            setRunning(true);
        }
        if (!finished) {
            setInput(e.target.value);
            console.log("Das ist mein Input", e.target.value);
            console.log("-----------------Das ist mein InputARR", inputArr);
        }
    };

    const handleStart = () => setRunning(true);
    const handleStop = () => setRunning(false);
    const handleReset = () => {
        setRunning(false);
        setTime(0);
        setInput('');
        setInputArr([]);
        setColoredText(null);
        setFinished(false);
    };

    const handleTextGenerated = () => {
        handleReset();
    };

    return (
        <div className="container main mt-5 p-2 rounded text-center">
            <div className="container d-flex justify-content-center align-items-center row">
                <h1 className="text-center">Rapid Typing App</h1>
                <p className="text-center">Enter <span style={{ fontStyle: "italic" }}>"Generate new Text"</span> for a new Text. With <span style={{ fontStyle: "italic" }}>"Time reset"</span> you can challenge yourself on another try</p>
                <StopWatch
                    time={time}
                    setTime={setTime}
                    running={running}
                    setRunning={setRunning}
                    handleReset={handleReset}
                    handleStart={handleStart}
                    handleStop={handleStop}
                />
                <div>
                    <p className='border border-primary rounded m-4 p-2'>
                        {generatedText ? coloredText : <p className='text-center mt-3'>Click Generate new Text</p>}
                    </p>
                </div>
                <label>
                    <input
                        type="text"
                        value={input}
                        onChange={handleChange}
                        disabled={generatedText.length === 0 || finished}
                        placeholder='Type as fast as you can'
                        id='input-field'
                        className="border border-primary rounded mb-2 p-2"
                    />
                </label>
                <Generator setGeneratedText={setGeneratedText} onTextGenerated={handleTextGenerated} />
                <button className='btn btn-primary' onClick={handleReset}>Time reset</button>
            </div>
        </div>
    );
};


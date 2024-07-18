import React, { useState } from 'react';
import axios from 'axios';

export const Generator = ({ setGeneratedText, onTextGenerated }) => {
    const [error, setError] = useState('');
    const [length, setLength] = useState(300); // Zustand für die maximale Textlänge

    const fetchText = async () => {
        try {
            const response = await axios.get('https://baconipsum.com/api/?type=all-meat&sentences=50');
            let text = response.data[0];
            if (text.length > length) {
                text = text.slice(0, length); // Text auf die maximale Länge kürzen
            }
            setGeneratedText(text);
            onTextGenerated(); // Callback-Funktion aufrufen, um das Eingabefeld zu aktivieren
        } catch (error) {
            setError('Etwas ist schief gelaufen beim Laden der Daten.');
            console.error('Error fetching data:', error);
        }
    };

    const handleLengthChange = (e) => {
        setLength(e.target.value);
    };

    return (
        <>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <label>
                <input
                    type="range"
                    value={length}
                    onChange={handleLengthChange}
                    min="50"
                    max="550"
                    step="50"
                    className='length-regulator'
                /> {length} chars
            </label>
            <button className='btn btn-primary m-2' onClick={fetchText}>Generate new Text</button>
        </>
    );
};





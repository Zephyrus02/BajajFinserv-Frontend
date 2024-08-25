import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [inputData, setInputData] = useState('');
    const [responseData, setResponseData] = useState(null);

    const handleInputChange = (e) => {
        setInputData(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const dataArray = inputData.split(',').map(item => item.trim());
            const response = await axios.post('http://localhost:8000/bfhl', { data: dataArray });
            setResponseData(response.data);
        } catch (error) {
            console.error("Error while posting data", error);
        }
    };

    return (
        <div className="App">
            <div className="container">
                <h1>Submit Data to Node.js Backend</h1>
                <input
                    type="text"
                    placeholder="Enter data (e.g., M,1,334,4,B,Z,a)"
                    value={inputData}
                    onChange={handleInputChange}
                    className="input-field"
                />
                <button onClick={handleSubmit} className="submit-button">Submit</button>

                {responseData && (
                    <div className="response-container">
                        <h2>Response:</h2>
                        <div><strong>Success:</strong> {responseData.is_success ? "True" : "False"}</div>
                        <div><strong>User ID:</strong> {responseData.user_id}</div>
                        <div><strong>Email:</strong> {responseData.email}</div>
                        <div><strong>Roll Number:</strong> {responseData.roll_number}</div>
                        <div><strong>Numbers:</strong> {responseData.numbers.join(', ')}</div>
                        <div><strong>Alphabets:</strong> {responseData.alphabets.join(', ')}</div>
                        <div><strong>Highest Lowercase Alphabet:</strong> {responseData.highest_lowercase_alphabet.join(', ')}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;

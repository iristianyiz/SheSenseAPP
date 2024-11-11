// frontend/screens/HealthDataScreen.js
// The HealthDataScreen component allows the user to log their health data (mood, menstrual cycle, 
// symptoms) through a form.
// When the user submits the form, the data is logged, and the mood over time is visualized in a line chart.
// The component is designed to be part of a health tracking application where users can track their
//  health data and view it over time.

import React, { useState } from 'react';
import { logHealthData, fetchHealthData } from '../services/healthDataApi';
import { Line } from 'react-chartjs-2';
import './HealthDataScreen.css'; // Import the CSS file for styling

function HealthDataScreen() {
    const [userId, setUserId] = useState('');
    const [date, setDate] = useState('');
    const [menstrualCycle, setMenstrualCycle] = useState('');
    const [mood, setMood] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [chartData, setChartData] = useState({});

    const handleLogData = async () => {
        const data = { userId, date, menstrualCycle, mood, symptoms: symptoms.split(',') };
        await logHealthData(data);
        alert('Data logged successfully');
        loadChartData();
    };

    const loadChartData = async () => {
        const data = await fetchHealthData(userId);
        setChartData({
            labels: data.map(entry => entry.date),
            datasets: [{
                label: 'Mood Over Time',
                data: data.map(entry => entry.mood === 'happy' ? 1 : 0),
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            }]
        });
    };

    return (
        <div className="health-data-container">
            <h1 className="header">Health Data Logger</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleLogData(); }} className="health-data-form">
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="User ID"
                    required
                    className="input-field"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    value={menstrualCycle}
                    onChange={(e) => setMenstrualCycle(e.target.value)}
                    placeholder="Menstrual Cycle"
                    className="input-field"
                />
                <input
                    type="text"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    placeholder="Mood"
                    required
                    className="input-field"
                />
                <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Symptoms (comma separated)"
                    className="textarea-field"
                />
                <button type="submit" className="submit-button">Log Health Data</button>
            </form>

            <div className="chart-container">
                <Line data={chartData} />
            </div>
        </div>
    );
}

export default HealthDataScreen;

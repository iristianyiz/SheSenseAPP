// frontend/screens/HealthDataScreen.js
import React, { useState } from 'react';
import { logHealthData, fetchHealthData } from '../services/healthDataApi';
import { Line } from 'react-chartjs-2';

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
        <div>
            <h1>Health Data Logger</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleLogData(); }}>
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" required />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <input type="text" value={menstrualCycle} onChange={(e) => setMenstrualCycle(e.target.value)} placeholder="Menstrual Cycle" />
                <input type="text" value={mood} onChange={(e) => setMood(e.target.value)} placeholder="Mood" required />
                <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="Symptoms (comma separated)" />
                <button type="submit">Log Health Data</button>
            </form>

            <Line data={chartData} />
        </div>
    );
}

export default HealthDataScreen;

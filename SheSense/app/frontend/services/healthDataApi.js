// frontend/services/healthDataApi.js
// handle API calls to the backend for logging and retrieving health data.
// This frontend service file communicates with the backend routes to request mood predictions.

export async function logHealthData(data) {
    const response = await fetch('http://localhost:3000/api/health/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.ok;
}

export async function fetchHealthData(userId) {
    const response = await fetch(`http://localhost:3000/api/health/${userId}`);
    return response.json();
}

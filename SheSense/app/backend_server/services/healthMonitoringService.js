// backend_server/services/healthMonitoringService.js
// handles data operations such as logging and fetching health data
// contains the primary logic for predicting mood. The service would handle data retrieval 
// (e.g., fetching user health records or recent entries) and then use the data to make a mood prediction.

import HealthData, { find } from '../models/healthDataModel';
import { tensor2d, sequential, layers } from '@tensorflow/tfjs-node'; // Use the Node.js version of TensorFlow

// Function to log health data
async function logHealthData(userId, date, menstrualCycle, mood, symptoms) {
    const healthEntry = new HealthData({ userId, date, menstrualCycle, mood, symptoms });
    await healthEntry.save();
    return 'Health data logged successfully';
}

// Function to fetch health data for trend analysis
async function fetchHealthData(userId) {
    const data = await find({ userId });
    return data;
}

// Function to render trend analysis data (e.g., preparing data for charts/visualization)
function prepareTrendAnalysisData(data) {
    const labels = data.map(item => item.date.toLocaleDateString());
    const moodData = data.map(item => (item.mood === "happy" ? 1 : 0)); // Encode mood

    return {
        labels,
        moodData,
    };
}

// Function to train a predictive model (simplified for mood prediction)
async function trainPredictiveModel(data) {
    // Convert data to tensors
    const xs = tensor2d(data.map(item => [ // input features
        item.menstrualCycle.length, // Example encoding for menstrualCycle
        item.symptoms.length        // Number of symptoms as a feature
    ]));

    const ys = tensor2d(data.map(item => [ // moods (1 = happy, 0 = not happy)
        item.mood === "happy" ? 1 : 0 // Binary classification for mood
    ]));

    // Define and compile the model
    const model = sequential(); // a linear stack of layers
    model.add(layers.dense({ units: 5, inputShape: [2], activation: 'relu' })); // dense (fully connected) neural network layers
    model.add(layers.dense({ units: 1, activation: 'sigmoid' }));
    model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' });

    // Train the model
    await model.fit(xs, ys, { epochs: 100 });
    return model;
}

// Function to predict mood based on model
async function predictMood(model, menstrualCycle, symptoms) {
    const input = tensor2d([[menstrualCycle.length, symptoms.length]]);
    const prediction = model.predict(input);
    const predictionValue = await prediction.data(); // Gets prediction as array
    return predictionValue[0]; // Returns the predicted mood
}

export default {
    logHealthData,
    fetchHealthData,
    prepareTrendAnalysisData,
    trainPredictiveModel,
    predictMood,
};

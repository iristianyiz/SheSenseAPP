// This file abstracts API calls from the frontend.

import axios from 'axios';

const analyzeSentiment = async (text) => {
    try {
        const response = await axios.post('http://localhost:5000/api/mentalHealth/analyze', { text });
        return response.data;
    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        throw error;
    }
};

export { analyzeSentiment };

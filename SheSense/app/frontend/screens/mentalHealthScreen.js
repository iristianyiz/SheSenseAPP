// the main screen where users will enter their journal entry or chat interaction.

import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const MentalHealthScreen = () => {
    const [journalText, setJournalText] = useState('');
    const [sentimentResult, setSentimentResult] = useState(null);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/mentalHealth/analyze', { text: journalText });
            setSentimentResult(response.data);
            setJournalText('');  // Clear text input after submission
        } catch (error) {
            console.error('Error submitting text:', error);
            Alert.alert('Error', 'There was an error processing your request. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Journal Entry</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter your thoughts here..."
                multiline
                onChangeText={setJournalText}
                value={journalText}
            />
            <Button title="Analyze Sentiment" onPress={handleSubmit} accessibilityLabel="Analyze sentiment" accessibilityHint="Submit your journal entry for sentiment analysis" />
            
            {sentimentResult && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>Sentiment Score: {sentimentResult.sentimentScore}</Text>
                    <Text style={styles.resultText}>Mood: {sentimentResult.mood}</Text>
                    {sentimentResult.resources && sentimentResult.resources.articles && sentimentResult.resources.articles.length > 0 ? (
                        <View>
                            <Text>Articles:</Text>
                            {sentimentResult.resources.articles.map((article, index) => (
                                <Text key={index}>{article}</Text>
                            ))}
                        </View>
                    ) : (
                        <Text>No articles available.</Text>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    textInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        height: 150,
    },
    resultContainer: { marginTop: 20 },
    resultText: { fontSize: 16, marginBottom: 10 },
});

export default MentalHealthScreen;


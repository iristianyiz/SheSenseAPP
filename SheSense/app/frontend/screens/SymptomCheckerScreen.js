// Step 1: Create a Symptom Checker Screen

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SymptomCheckerScreen = () => {
  // State to store the user's symptom input
  const [symptoms, setSymptoms] = useState('');
  const [error, setError] = useState('');

  // Function to handle the change in text input
  const handleSymptomChange = (text) => {
    // Count words in the input
    const wordCount = text.trim().split(/\s+/).length;

    // Limit to 250 words
    if (wordCount <= 250) {
      setSymptoms(text);
      setError('');
    } else {
      setError('Please limit your input to 250 words :)');
    }
  };

  // Function to handle the form submission (could call an API or process the symptoms)
  const handleSubmit = () => {
    if (symptoms.trim().length > 0) {
      console.log('User symptoms:', symptoms);
      // You can call your API to process the symptoms here
    } else {
      setError('Please enter your symptoms.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Symptom Checker</Text>
      <Text style={styles.description}>
        Please describe your symptoms (maximum 250 words):
      </Text>

      <TextInput
        style={styles.textInput}
        placeholder="Enter your symptoms here..."
        multiline
        numberOfLines={6}
        value={symptoms}
        onChangeText={handleSymptomChange}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Submit" onPress={handleSubmit} />

      {/* Optional: display the word count */}
      <Text style={styles.wordCount}>Word Count: {symptoms.trim().split(/\s+/).length}</Text>
    </View>
  );
};

// Styles for the Symptom Checker screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top', // makes text align at the top
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  wordCount: {
    marginTop: 10,
    fontSize: 12,
    color: '#555',
  },
});

export default SymptomCheckerScreen;

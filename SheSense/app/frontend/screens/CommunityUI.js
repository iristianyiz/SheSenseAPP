import React, { useState } from 'react';
import './CommunityUI.css';
import ContentService from './ContentService';  // Import the service class

function CommunityUI() {
  // State for user input and feedback
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');

  // Function to handle content submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInput.trim()) {
      setFeedback('Please enter some content!');
      return;
    }

    try {
      // Use ContentService to submit the content
      const data = await ContentService.submitContent(userInput);

      // Handle feedback based on moderation result
      if (data.success) {
        setFeedback('Your content has been successfully published!');
      } else {
        setFeedback('Your content was flagged for inappropriate language. Please revise it.');
      }
    } catch (error) {
      setFeedback('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="CommunityUI">
      <h1>SheSense Health: Submit Your Health Tip</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your health tip here..."
          rows="5"
          cols="40"
        />
        <br />
        <button type="submit">Submit Content</button>
      </form>

      {feedback && <p>{feedback}</p>}
    </div>
  );
}

export default CommunityUI;

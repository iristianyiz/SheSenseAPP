class CommunityContentService {
    static async submitContent(userInput) {
      try {
        const response = await fetch('http://localhost:5000/api/submit-content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: userInput }),
        });
  
        const data = await response.json();
        return data;  // Return the response from the server
      } catch (error) {
        console.error('Error submitting content:', error);
        throw new Error('An error occurred while submitting the content.');
      }
    }
  }
  
  export default CommunityContentService;
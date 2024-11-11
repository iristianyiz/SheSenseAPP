// Step 3: Connecting Frontend to Backend

// Function to send symptoms data to the backend
export const submitSymptoms = async (symptomsText) => {
    try {
      const response = await fetch('http://localhost:5000/api/symptom-checker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: symptomsText }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Symptom data submitted successfully:', data);
        return data;
      } else {
        console.error('Error submitting symptoms:', data.error);
        throw new Error(data.error || 'Error submitting symptoms');
      }
    } catch (error) {
      console.error('Error in network request:', error);
      throw error;
    }
  };
  
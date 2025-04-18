// /backend/services/symptomAnalysis.js
import { exec } from "child_process";

// Function to analyze the symptoms using Python
function analyzeSymptomsWithPython(symptomsText, callback) {
  exec(
    `python3 /path/to/your/python/script/symptom_analysis.py "${symptomsText}"`, 
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        callback(error, null);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        callback(stderr, null);
        return;
      }
      // Parse the result from the Python script
      const result = JSON.parse(stdout);  // Assuming the Python script returns JSON data
      callback(null, result);
    }
  );
}

export default {
  analyzeSymptomsWithPython,
};

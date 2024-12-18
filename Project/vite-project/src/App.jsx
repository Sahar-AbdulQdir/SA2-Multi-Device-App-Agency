import { useState, useEffect } from 'react'; // Import useEffect along with useState

import './App.css';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3002'); // Fetch data from the API
        const data = await res.json(); // Parse the response as JSON
        console.log(data); // Log the data to the console
      } catch (error) {
        console.error('Error fetching data:', error); // Log an error if it occurs
      }
    };
    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array to run this effect only once when the component mounts

  return (
    <>
      {/* Your UI components go here */}
    </>
  );
}

export default App;

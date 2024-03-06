import React, { useEffect, useState } from 'react';
import PersonCard from './ui/personcard'

const CardsList = () => {
  const [items, setItems] = useState([]); // State to store the data

  // Function to fetch data from your database
  const fetchData = async () => {
    try {
      const response = await fetch('your-database-endpoint');
      const data = await response.json();
      setItems(data); // Assuming the data is an array of items
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  // Render a list of Card components
  return (
    <div>
      {items.map((item) => (
        <PersonCard key={}/>
      ))}
    </div>
  );
};

export default CardsList;
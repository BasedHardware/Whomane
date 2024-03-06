import React, { useEffect, useState } from 'react';
import { getPeopleFromFirestore, updatePersonDoc } from "../utils/firebase";
import PersonCard from './PersonCard'; // Adjust the import path according to your project structure

export default function CardList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPeople = async () => {
    try {
      const fetchedPeople = await getPeopleFromFirestore();
      setData(fetchedPeople);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching people:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div key="1" className="flex flex-col w-full min-h-screen">
      {/* Header and other UI elements */}
      {loading && <p className='text-white'>Loading people...</p>}
      <main className="flex flex-col bg-black">
        
        {data.map((person: any) => (
          <PersonCard key={person.id} {...person} updatePersonDoc= {updatePersonDoc}/>
        ))}
      </main>
    </div>
  );
}

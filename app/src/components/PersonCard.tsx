import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import Microlink from "@microlink/react";
// import { db } from '../lib/firebase'; // Adjust this import according to your Firebase config setup
// import { doc, updateDoc } from 'firebase/firestore';

function PersonCard({ id, time, socials, updatePersonDoc, linkedinSummary, linkedinSummaryAudio, latestQuestion, imageURL }) {
  const [_linkedinSummary, setLinkedinSummary] = useState(linkedinSummary || '');
  const [_linkedinSummaryAudio, setLinkedinSummaryAudio] = useState(linkedinSummaryAudio || '');
  const [_latestQuestion, setLatestQuestion] = useState(latestQuestion || '');
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('How would you describe this person in summary?');
  const onQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const getLinkedinSummary = async () => {
    console.log('Getting linkedin summary');
    setLoading(true);
    fetch('/api/summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        socials: socials,
        question: question
      }),
    })
      .then(response => response.json())
      .then(data => {
        try {
        updatePersonDoc(id, {
            linkedinSummary: data.linkedinSummary.summary,
            linkedinSummaryAudio: data.linkedinSummary.audio,
            latestQuestion: question
            });
        } catch (error) {
          console.error('Error updating document:', error);
        }

        setLinkedinSummary(data.linkedinSummary.summary);
        setLinkedinSummaryAudio(data.linkedinSummary.audio);
        // setLatestQuestion(question);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!_linkedinSummary) {
      getLinkedinSummary();
    }
  }, []);

  return (
    <div className="bg-black h-full h-80 mb-10 mt-10 p-6 flex flex-col gap-8">
      <img src={imageURL} alt="Person" className="w-20 h-20 object-cover rounded-lg mx-auto" />
      <h1 className="text-lg md:text-7xl font-normal pb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300 rounded-md">Your scan ⤵</h1>
      <div className="flex flex-wrap justify-center items-start">
        {socials.slice(0, 3).map((social, index) => (
          <Button key={index} className="h-full w-1/4 rounded-full ml-4 mt-4 relative" size="icon" variant="ghost">
            <span className={`absolute top-2 left-2 rounded-full p-3 z-10 ${social.score >= 85 ? 'bg-green-200' : 'bg-orange-200 '}`}>
              <p className="text-sm font-bold">{social.score}</p>
            </span>
            <div className="w-full max-h-80 overflow-y-scroll">
              <Microlink size="large" url={social.url}  api-key="muMD5YUHis3IZiVQiBNTa2mzESIPqVTy7uAKWs7w" />
              <span><a className="text-white" href={social.url}>{social.url}</a></span>
            </div>
          </Button>
        ))}
      </div>
      {false && <p className="text-xs md:text-xl font-normal text-center text-neutral-400 mt-4 max-w-lg mx-auto">Generating summary about person...</p>}

      {latestQuestion && <p className="text-xs md:text-xl font-normal text-center text-neutral-400 mt-4 max-w-lg mx-auto">Summary about person:</p>}
      {linkedinSummary && <p className="text-white">{linkedinSummary}</p>}
      {linkedinSummaryAudio && (
        <audio controls>
          <source src={linkedinSummaryAudio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}

export default PersonCard;
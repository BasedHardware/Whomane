import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Microlink from "@microlink/react";
// import { db } from '../lib/firebase'; // Adjust this import according to your Firebase config setup
// import { doc, updateDoc } from 'firebase/firestore';

function PersonCard({ id, time, socials, updatePersonDoc, linkedinSummary, linkedinSummaryAudio, latestQuestion }) {
  const [_linkedinSummary, setLinkedinSummary] = useState(linkedinSummary || '');
  const [_linkedinSummaryAudio, setLinkedinSummaryAudio] = useState(linkedinSummaryAudio || '');
  const [_latestQuestion, setLatestQuestion] = useState(latestQuestion || '');
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');

  const onQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const getLinkedinSummary = async () => {
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
        setLatestQuestion(question);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  return (
    <div className="bg-white w-full h-full h-80 mb-10 mt-10 p-6 flex flex-col gap-8">
      <h1 className="font-bold">Scanned on {time} </h1>
      <div className="flex flex-wrap justify-start items-start">
        {socials.slice(0, 6).map((social, index) => (
          <Button key={index} className="h-full w-1/4 rounded-full ml-4 mt-4 relative" size="icon" variant="ghost">
            <span className={`absolute top-2 left-2 rounded-full p-3 z-10 ${social.score >= 90 ? 'bg-green-200' : 'bg-orange-200 '}`}>
              <p className="text-sm">{social.score}</p>
            </span>
            <div className="w-full max-h-80 overflow-y-scroll">
              <Microlink url={social.url}  />
            </div>
          </Button>
        ))}
      </div>
      <input placeholder="Ask me a question" value={question} onChange={onQuestionChange}></input>
      <Button onClick={getLinkedinSummary} className="bg-black text-white rounded-full ml-10 mt-10 w-40" size="icon" variant="ghost">
        {loading ? <span>Researching person...</span> : <span>Ask question</span>}
      </Button>
      {latestQuestion && <p className="font-bold text-lg">{latestQuestion}</p>}
      {linkedinSummary && <p>{linkedinSummary}</p>}
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
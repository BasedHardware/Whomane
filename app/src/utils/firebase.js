// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

import { serverTimestamp } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};


// Initialize Firebase
if (!getApps().length) {
  const app = initializeApp(firebaseConfig);
  console.log("initializing firebase! ");
}
const db = getFirestore();


export const addPersonWithSocialsToFirestore = async (socials) => {
  try {
    const peopleCollection = collection(db, "people");
    const docRef = await addDoc(peopleCollection, {
      time: serverTimestamp(),
        });

    const socialsCollection = collection(docRef, "socials");

    for (let social of socials) {
      console.log(social);
      const documentData = {
        'score': social['score'],
        'url': social['url'],
      };
      await addDoc(socialsCollection, documentData);
    }

    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// get all messages with role assistant and privacyOption public
export const getPeopleFromFirestore =
  async () => {
    try {
      const peopleCollection = collection(db, "people");
      const q = query(peopleCollection);
      const querySnapshot = await getDocs(q);
      const people = [];
      for (let doc of querySnapshot.docs) {
        const person = doc.data();
        const socialsCollection = collection(doc.ref, "socials");
        const socialsSnapshot = await getDocs(socialsCollection);
        const socials = [];
        socialsSnapshot.forEach((socialDoc) => {
          if(socialDoc.data().score >= 60) {
            socials.push(socialDoc.data());
          }
        });
        socials.sort((a, b) => b.score - a.score);
     
        person.socials = socials;
        try {
          person.time = new Date(person.time.seconds * 1000).toString();
        } catch (error) {
          return person.time;
        }
        person.id = doc.id; // Adding the id of the person to the data
        if(socials.length > 0) {
          person.socials = socials;
          people.push(person);
        }
      }
  
      return people;
    } catch (error) {
      console.error(
        "Error fetching messages:",
        error
      );
      throw error;
    }
  };

  export const updatePersonDoc = async (personId, data) => {
    const personDoc = doc(db, "people", personId);
    await updateDoc(personDoc, data);
  };


export default db;

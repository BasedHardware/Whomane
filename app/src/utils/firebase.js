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
  getDoc,
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


export const createPersonDocument = async (userID, imageURL) => {
  console.log('trying to create person doc with '+ userID +" and "+ imageURL)
  try {
    const peopleCollection = collection(db, "people");
    const docRef = await addDoc(peopleCollection, {
      time: serverTimestamp(),
      status: 'processing',
      userID: userID,
      imageURL: imageURL || '',
    });

    console.log("Document created with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating document: ", error);
  }
};

export const addSocialsToPersonDocument = async (socials, docId) => {
  try {
    if (typeof docId !== 'string') {
      throw new Error(`Expected docId to be a string, but got ${typeof docId}`);
    }

    const peopleCollection = collection(db, "people");
    const docRef = doc(peopleCollection, docId);

    if (!docRef || typeof docRef !== 'object' || !docRef.id) {
      throw new Error(`Expected docRef to be a DocumentReference, but got ${typeof docRef}`);
    }

    const socialsCollection = collection(docRef, "socials");

    for (let social of socials) {
      console.log(social);
      const documentData = {
        'score': social['score'],
        'url': social['url'],
      };
      await addDoc(socialsCollection, documentData);
    }
    await updateDoc(docRef, {
      status: 'completed',
    });

    console.log("Socials added to document with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding socials to document: ", error);
    try {
      const peopleCollection = collection(db, "people");
      const newPersonDoc = await addDoc(peopleCollection, {
        time: serverTimestamp(),
        status: 'processing',

      });
      const newSocialsCollection = collection(newPersonDoc, "socials");
      for (let social of socials) {
        const documentData = {
          'score': social['score'],
          'url': social['url'],
        };
        await addDoc(newSocialsCollection, documentData);
      }
      console.log("New person document and socials created due to error.");
    } catch (newError) {
      console.error("Error creating new person document and socials: ", newError);
    }
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

  export const getPersonFromFirestore = async (docID) => {
    try {
      const personDoc = doc(db, "people", docID);
      const personSnapshot = await getDoc(personDoc);
      if (!personSnapshot.exists()) {
        console.log("No such document!");
        return null;
      } else {
        const person = personSnapshot.data();
        const socialsCollection = collection(db, "people", docID, "socials");
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
        person.id = personSnapshot.id; // Adding the id of the person to the data
        if(socials.length > 0) {
          person.socials = socials;
        }
        return person;
      }
    } catch (error) {
      console.error(
        "Error fetching person:",
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

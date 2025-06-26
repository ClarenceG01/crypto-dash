// Firebase and Firestore initialization for CryptoDash
// ----------------------------------------------------
// This file sets up the Firebase app and Firestore database instance.
// Import this file wherever you need to interact with Firestore.

// Import the functions you need from the Firebase SDKs
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration.
// You can find this information in your Firebase project settings.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore database and export it
export const db = getFirestore(app);

// Now you can import { db } from '../utils/firebase' to use Firestore in your app. 
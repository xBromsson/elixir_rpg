// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrdpc8x1RNrGOBhmCnN9DI5ldCRnSWGhM",
  authDomain: "elixirrpg-4bb44.firebaseapp.com",
  projectId: "elixirrpg-4bb44",
  storageBucket: "elixirrpg-4bb44.appspot.com",
  messagingSenderId: "82182456619",
  appId: "1:82182456619:web:3c79a769fea8169907316e",
  measurementId: "G-C9CBTQJ2M0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7wEDfVjFh8v8kBoKooqo7ANYsQK9AYcg",
  authDomain: "ticketbooking-6bdf8.firebaseapp.com",
  projectId: "ticketbooking-6bdf8",
  storageBucket: "ticketbooking-6bdf8.firebasestorage.app",
  messagingSenderId: "614696855721",
  appId: "1:614696855721:web:d2c6d2e5264080dd2a61b8",
  measurementId: "G-XBRLS8GS4V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const provider=new GoogleAuthProvider();
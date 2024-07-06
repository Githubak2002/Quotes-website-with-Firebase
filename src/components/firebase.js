// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnGKiGOA0kJvhnRcuvANyYescnlcuRN-0",
  authDomain: "auth-trial-ak.firebaseapp.com",
  projectId: "auth-trial-ak",
  storageBucket: "auth-trial-ak.appspot.com",
  messagingSenderId: "550292964441",
  appId: "1:550292964441:web:e70a90581a5c8942a89d48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);

export default app;

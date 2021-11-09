// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCin3qgWf3eGCBKo-YJsIg1YNdXEr2L3uA",
  authDomain: "clay-firestore-app.firebaseapp.com",
  projectId: "clay-firestore-app",
  storageBucket: "clay-firestore-app.appspot.com",
  messagingSenderId: "248934231677",
  appId: "1:248934231677:web:4288e6119fd1b24fd20b14",
  measurementId: "G-KNNF34K0NB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);



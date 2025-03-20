// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzSu66R5b-w0eO4Oe_YyNfsVOiZXa1CTo",
  authDomain: "booklibrary-2b26e.firebaseapp.com",
  projectId: "booklibrary-2b26e",
  storageBucket: "booklibrary-2b26e.firebasestorage.app",
  messagingSenderId: "424953385055",
  appId: "1:424953385055:web:66782c688124fc7ebd0bea",
  measurementId: "G-4ZN6Z0DHD8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs };
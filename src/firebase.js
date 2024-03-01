// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDan0ucufeRK8ZMYhXjU3OuxPsHm9IAq8A",
  authDomain: "recipe-2c05e.firebaseapp.com",
  projectId: "recipe-2c05e",
  storageBucket: "recipe-2c05e.appspot.com",
  messagingSenderId: "474080570307",
  appId: "1:474080570307:web:34977016eb7d52dbebeb76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
auth.languageCode = "it";
const db = getFirestore(app);
export { db };

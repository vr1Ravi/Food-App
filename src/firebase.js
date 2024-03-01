import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDan0ucufeRK8ZMYhXjU3OuxPsHm9IAq8A",
  authDomain: "recipe-2c05e.firebaseapp.com",
  projectId: "recipe-2c05e",
  storageBucket: "recipe-2c05e.appspot.com",
  messagingSenderId: "474080570307",
  appId: "1:474080570307:web:34977016eb7d52dbebeb76",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = "en";
const db = getFirestore(app);
export { db, auth };

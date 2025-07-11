// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbOZy24KzP2U_rhjorAngCkCDry_zdyd4",
  authDomain: "class-tick.firebaseapp.com",
  projectId: "class-tick",
  storageBucket: "class-tick.firebasestorage.app",
  messagingSenderId: "173936068468",
  appId: "1:173936068468:web:300fc9cd77eb4f062c0e21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export {db, auth}
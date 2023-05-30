// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMhmP0uqTMvjjkXIRgmY6GTpq4LBJspyM",
  authDomain: "findwaldo-7c0fc.firebaseapp.com",
  projectId: "findwaldo-7c0fc",
  storageBucket: "findwaldo-7c0fc.appspot.com",
  messagingSenderId: "743428938091",
  appId: "1:743428938091:web:74a132d7921fbeb400942e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

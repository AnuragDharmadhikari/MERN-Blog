// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-953bf.firebaseapp.com",
  projectId: "mern-blog-953bf",
  storageBucket: "mern-blog-953bf.appspot.com",
  messagingSenderId: "804547438246",
  appId: "1:804547438246:web:a75ae14ea8d424c6243667"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


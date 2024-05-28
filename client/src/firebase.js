// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-ec886.firebaseapp.com",
  projectId: "mern-blog-ec886",
  storageBucket: "mern-blog-ec886.appspot.com",
  messagingSenderId: "104374697651",
  appId: "1:104374697651:web:311b52f972838694787ac6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

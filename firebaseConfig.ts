// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApn_dpFOVXs-UUxaGNSdeyMJYzRvmv41k",
  authDomain: "daeliminsta-ec63d.firebaseapp.com",
  projectId: "daeliminsta-ec63d",
  storageBucket: "daeliminsta-ec63d.firebasestorage.app",
  messagingSenderId: "336943478566",
  appId: "1:336943478566:web:1714821fcd343910b8b3e7",
  measurementId: "G-BZGXT0MR3Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication(인증 관련)
export const auth = initializeAuth(app);

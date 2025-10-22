// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRjzOJT8F1dDMmMPvn5LoZvFL-jAVCY0I",
  authDomain: "mhm-builders-inc-website.firebaseapp.com",
  projectId: "mhm-builders-inc-website",
  storageBucket: "mhm-builders-inc-website.firebasestorage.app",
  messagingSenderId: "816689775773",
  appId: "1:816689775773:web:d3d159eb7949bf952d4074",
  measurementId: "G-GLPN81XP92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
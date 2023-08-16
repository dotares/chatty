import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDoXx4X7zZUqQ2yaFrH735Um4NYHMqUf7o",
  authDomain: "chatty-801e9.firebaseapp.com",
  projectId: "chatty-801e9",
  storageBucket: "chatty-801e9.appspot.com",
  messagingSenderId: "806484821213",
  appId: "1:806484821213:web:5c380f90915a41b5ff4734",
  measurementId: "G-NE77KYDSYP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// const analytics = getAnalytics(app);

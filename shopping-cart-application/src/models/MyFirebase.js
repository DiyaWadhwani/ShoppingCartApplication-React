// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5PXm6G95rkci49nWXVLi6dvoD2nVcOGc",
  authDomain: "shoppingcart-c69ac.firebaseapp.com",
  projectId: "shoppingcart-c69ac",
  storageBucket: "shoppingcart-c69ac.appspot.com",
  messagingSenderId: "1076077748257",
  appId: "1:1076077748257:web:a7ff4df7a096ec40780360",
  measurementId: "G-3QQVT4F7WE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

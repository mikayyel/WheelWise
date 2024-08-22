import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDoDDnyd2UFkRDXCu58dpGOV5-m5gn37M",
  authDomain: "authforautoclub.firebaseapp.com",
  projectId: "authforautoclub",
  storageBucket: "authforautoclub.appspot.com",
  messagingSenderId: "545036873838",
  appId: "1:545036873838:web:faf7c2d403cc1d1c73b67f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

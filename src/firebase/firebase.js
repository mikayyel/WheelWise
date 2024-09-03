import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDoDDnyd2UFkRDXCu58dpGOV5-m5gn37M",
  authDomain: "authforautoclub.firebaseapp.com",
  projectId: "authforautoclub",
  storageBucket: "authforautoclub.appspot.com",
  messagingSenderId: "545036873838",
  appId: "1:545036873838:web:faf7c2d403cc1d1c73b67f",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

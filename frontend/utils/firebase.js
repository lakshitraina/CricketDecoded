import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDdHgj4J76HK57SQ2vRGZ7lq7pxGOCWWWw",
  authDomain: "cricklytics-d023c.firebaseapp.com",
  projectId: "cricklytics-d023c",
  storageBucket: "cricklytics-d023c.firebasestorage.app",
  messagingSenderId: "1022463560168",
  appId: "1:1022463560168:web:b582085e62e984a4cffc5d",
  measurementId: "G-YQ72TX3EB3",
  databaseURL: "https://cricklytics-d023c-default-rtdb.firebaseio.com"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const rtdb = getDatabase(app);

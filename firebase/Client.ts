import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmhh-5GwWeuVTEE2iVHZ7yyOub3c3-Yt8",
  authDomain: "prepwise-a260b.firebaseapp.com",
  projectId: "prepwise-a260b",
  storageBucket: "prepwise-a260b.firebasestorage.app",
  messagingSenderId: "772824764083",
  appId: "1:772824764083:web:5e8b096d6dd82f8b95aac6",
  measurementId: "G-ECX2R9KHEW"
};


const app = !getApps.length ? initializeApp(firebaseConfig) : getApp() ;

export const auth = getAuth(app)
export const db = getFirestore(app)
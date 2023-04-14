import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDJYus2lFYN4-c1GnB3WxtRgDXv45-9maQ",
  authDomain: "fir-v9-58ee0.firebaseapp.com",
  projectId: "fir-v9-58ee0",
  storageBucket: "fir-v9-58ee0.appspot.com",
  messagingSenderId: "272963487283",
  appId: "1:272963487283:web:68096826e9ea555f560546"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

// Apple Auth

// Microsoft Auth

// Google Auth
export const googleProvider = new GoogleAuthProvider()

// FireStore
export const db = getFirestore(app)

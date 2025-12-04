// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsX7QL97uRDbUhgKSkwQx_qzSZVTninv8",
  authDomain: "al-nails-react.firebaseapp.com",
  projectId: "al-nails-react",
  storageBucket: "al-nails-react.appspot.com",
  messagingSenderId: "84134603236",
  appId: "1:84134603236:web:948e8d996bf1ea0d30e5fd"
};

// Inicializa app
const app = initializeApp(firebaseConfig);

// EXPORTA TUDO
export const auth = getAuth(app);
export const db = getFirestore(app);


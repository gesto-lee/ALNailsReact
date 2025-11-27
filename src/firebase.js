// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/*
  ====== COLE AQUI O SEU FIREBASE CONFIG (v9 modular) ======
  Exemplo:
*/
const firebaseConfig = {
  apiKey: "AIzaSyAxFC0eOx0wxXW1DUb2SNlu8-isedQA6yw",
  authDomain: "al-nails-designers.firebaseapp.com",
  projectId: "al-nails-designers",
  storageBucket: "al-nails-designers.firebasestorage.app",
  messagingSenderId: "522284057246",
  appId: "1:522284057246:web:e3ecc9a46509cbed61718f",
  measurementId: "G-JWKF7FTY6J"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;

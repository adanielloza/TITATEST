import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCb5vSvxMRZh91bhfg2IIpDkSZ0b2y05DY",
  authDomain: "fir-fuvime.firebaseapp.com",
  databaseURL: "https://fir-fuvime-default-rtdb.firebaseio.com",

  projectId: "fir-fuvime",
  storageBucket: "fir-fuvime.firebasestorage.app",
  messagingSenderId: "263267213279",
  appId: "1:263267213279:web:953d2b3236326f88ef6e6a",
  measurementId: "G-KPT3SYE6NV",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };

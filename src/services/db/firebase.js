import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA35S9oxx1FxV4VvX9-voq2-py4PwUECYQ",
  authDomain: "tita-d7bd8.firebaseapp.com",
  projectId: "tita-d7bd8",
  storageBucket: "tita-d7bd8.firebasestorage.app",
  messagingSenderId: "1066591329316",
  appId: "1:1066591329316:web:980c03f6f85700d1f5ccb1"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
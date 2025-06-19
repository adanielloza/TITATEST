import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  remove,
  update,
} from "firebase/database";

const firebaseConfig = {
  apiKey:            "AIzaSyA35S9oxx1FxV4VvX9-voq2-py4PwUECYQ",
  authDomain:        "tita-d7bd8.firebaseapp.com",
  projectId:         "tita-d7bd8",
  storageBucket:     "tita-d7bd8.appspot.com",       // note the “.appspot.com”
  messagingSenderId: "1066591329316",
  appId:             "1:1066591329316:web:980c03f6f85700d1f5ccb1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const rtdb = getDatabase(app);

export { app, db, auth, rtdb, ref, set, get, child, remove, update };
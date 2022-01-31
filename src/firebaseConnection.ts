import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU735uHRtmLrtocv7fAPZD0yILblHTS8s",
  authDomain: "meuapp-7cc21.firebaseapp.com",
  databaseURL: "https://meuapp-7cc21-default-rtdb.firebaseio.com",
  projectId: "meuapp-7cc21",
  storageBucket: "meuapp-7cc21.appspot.com",
  messagingSenderId: "102106762906",
  appId: "1:102106762906:web:b09aa6e303423dfa03d923",
  measurementId: "G-T3FCKX9G2Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const dbRef = ref(db);


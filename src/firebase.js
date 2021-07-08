import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyB0JpyQEEsiXCROOIiNjOR_3_IVsdJrz4A",
  authDomain: "debtapp-2f389.firebaseapp.com",
  projectId: "debtapp-2f389",
  storageBucket: "debtapp-2f389.appspot.com",
  messagingSenderId: "483293932886",
  appId: "1:483293932886:web:fa6db6d15f81e8d8d33af7",
  measurementId: "G-L1KMYHC1JH",
});
export const auth = app.auth();
export const db = app.firestore();
export default app;

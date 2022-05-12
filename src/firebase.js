import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AuthDomain,
  projectId: process.env.REACT_APP_ProjectId,
  storageBucket: process.env.REACT_APP_StorageBucket,
  messagingSenderId: process.env.REACT_APP_MessagingSenderId,
  appId: process.env.REACT_APP_AppId,
  measurementId: process.env.REACT_APP_MeasurementId,
});
export const auth = app.auth();
export const db = app.firestore();
export default app;

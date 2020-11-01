// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDLxmzRJLr5chSttUa8-k5pfxdudX_TP0A",
  authDomain: "onepoint-e4f26.firebaseapp.com",
  databaseURL: "https://onepoint-e4f26.firebaseio.com",
  projectId: "onepoint-e4f26",
  storageBucket: "onepoint-e4f26.appspot.com",
  messagingSenderId: "763102304785",
  appId: "1:763102304785:web:5e39e63ba8265b63ae2fb0",
  measurementId: "G-VQBDF1JLMZ",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

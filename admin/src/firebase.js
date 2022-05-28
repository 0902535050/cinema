import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB79taGySDCWiyPXsEP7knHpGuv_SBHYeM",
  authDomain: "netflix-95599.firebaseapp.com",
  projectId: "netflix-95599",
  storageBucket: "netflix-95599.appspot.com",
  messagingSenderId: "1086392525789",
  appId: "1:1086392525789:web:d41b3392b7f55b784d0c34",
  measurementId: "G-R3T1GFC1H0",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;

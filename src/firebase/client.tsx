import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAxn4ZtCdOSq7ElL8_nZHpFTPkud7VllKY",
  authDomain: "book-bank-28c86.firebaseapp.com",
  projectId: "book-bank-28c86",
  storageBucket: "book-bank-28c86.appspot.com",
  messagingSenderId: "593748523032",
  appId: "1:593748523032:web:7d1b53361826e2d630ab6d",
};

// if(!firebase.apps.length){
//   firebase.initializeApp(clientCredentials);
// }

export default function firebaseClient() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
}

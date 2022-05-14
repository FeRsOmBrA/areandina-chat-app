import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAbgC5szdS1EH52cFrssg7-VuGp530nw8Q",
  authDomain: "gifted-chat-513b5.firebaseapp.com",
  projectId: "gifted-chat-513b5",
  storageBucket: "gifted-chat-513b5.appspot.com",
  messagingSenderId: "259498373705",
  appId: "1:259498373705:web:abc82dab026556c0408598"
};
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = app.firestore();
}
const db = app.firestore();
const auth = firebase.auth();
export {db,auth};
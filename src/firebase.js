import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBKyAlaA5LyBoKu5jojbCBqMxWlpiDsd5c",
  authDomain: "whatsapp-clone-ac4f5.firebaseapp.com",
  projectId: "whatsapp-clone-ac4f5",
  storageBucket: "whatsapp-clone-ac4f5.appspot.com",
  messagingSenderId: "450411189679",
  appId: "1:450411189679:web:0837182e0b92b75c188b5a",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;

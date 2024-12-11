import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA97JgkGyPPfaFYGYWIXKF3zz3iog_FOHY",
    authDomain: "tasks-3e1bc.firebaseapp.com",
    projectId: "tasks-3e1bc",
    storageBucket: "tasks-3e1bc.firebasestorage.app",
    messagingSenderId: "162460316719",
    appId: "1:162460316719:web:bef26dd6269396249602da"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };






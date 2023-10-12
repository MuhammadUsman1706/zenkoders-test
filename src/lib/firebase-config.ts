import { initializeApp } from "firebase/app";
import { getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBE4AREERlqbfqqfNeGG4DNo-8MHZtLQ9M",
  authDomain: "zenkoders-test.firebaseapp.com",
  projectId: "zenkoders-test",
  storageBucket: "zenkoders-test.appspot.com",
  messagingSenderId: "357514319098",
  appId: "1:357514319098:web:a4142710e4b900620b2543",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const firebaseInitializer = () => initializeApp(firebaseConfig);

export { auth, provider };

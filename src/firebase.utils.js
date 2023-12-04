import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";  
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD9OkMo_INgdM5P34ZgzpDalNEusxPphVI",
  authDomain: "rsudheerportfolio.firebaseapp.com",
  projectId: "rsudheerportfolio",
  storageBucket: "rsudheerportfolio.appspot.com",
  messagingSenderId: "905737212471",
  appId: "1:905737212471:web:080e4fcf670ea67b3225b2",
  measurementId: "G-H10VR54TKW"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);

export {db};
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxxyMsqat7kYTIJMQzafF7FeN49wDUZUE",
  authDomain: "worldexplorer-bab3d.firebaseapp.com",
  projectId: "worldexplorer-bab3d",
  storageBucket: "worldexplorer-bab3d.firebasestorage.app",
  messagingSenderId: "163166422427",
  appId: "1:163166422427:web:e4447482de0952f1de0d3e",
  measurementId: "G-MG7C06XQ94",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCK-8z1SXi6C9JiZereDBEWzW2V9pCqoY",
  authDomain: "lab03-e74bb.firebaseapp.com",
  projectId: "lab03-e74bb",
  storageBucket: "lab03-e74bb.firebasestorage.app",
  messagingSenderId: "681950683632",
  appId: "1:681950683632:web:6dc43a5c8b9f4e8316fd35",
  measurementId: "G-2MR54CGXPG",
};


// Initialize Firebase if not already initialized
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };

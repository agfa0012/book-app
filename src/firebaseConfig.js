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

// const firebaseConfig = {
//   apiKey: "AIzaSyCoA6oakVS6nnBF_Dzfmd1msTtK553BzoY",
//   authDomain: "book-app-e3256.firebaseapp.com",
//   projectId: "book-app-e3256",
//   storageBucket: "book-app-e3256.firebasestorage.app",
//   messagingSenderId: "967629049497",
//   appId: "1:967629049497:web:571eecb08e6da1eca93208",
//   measurementId: "G-9PYW3770MF"
// };

// Initialize Firebase if not already initialized
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTM7mXqMKISObBkUr04P4rX5ytpnEaK1Q",
  authDomain: "recetas-app-2bce2.firebaseapp.com",
  projectId: "recetas-app-2bce2",
  storageBucket: "recetas-app-2bce2.firebasestorage.app",
  messagingSenderId: "332539288048",
  appId: "1:332539288048:web:dcd70111442b14057be535"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

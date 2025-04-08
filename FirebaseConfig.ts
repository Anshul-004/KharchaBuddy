import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

// import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4oVNkXFbrKd49OCPgTUbSR36kVj2qF1c",
  authDomain: "kharchabuddy.firebaseapp.com",
  projectId: "kharchabuddy",
  storageBucket: "kharchabuddy.firebasestorage.app",
  messagingSenderId: "431789125726",
  appId: "1:431789125726:web:4e52e9ddd34c8612aec4cf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});


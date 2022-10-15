import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc,
  setDoc 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBsFdK7Vwt-uI369UGXNTleIAdrLxGUWX8",
  authDomain: "crwn-store-db-63b1e.firebaseapp.com",
  projectId: "crwn-store-db-63b1e",
  storageBucket: "crwn-store-db-63b1e.appspot.com",
  messagingSenderId: "529173630365",
  appId: "1:529173630365:web:6f04de444fbb0c3cc27374",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});
export const signInWithGooglePopup = () => (
  signInWithPopup(auth, googleProvider)
);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid); // doc creates document
  const userSnapshot = await getDoc(userDocRef); // gets document

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
      const createdAt = new Date();
      const userData = {
        displayName: displayName, 
        email: email,
        createdAt: createdAt
      }

      try {
        await setDoc(userDocRef, userData);  // setDoc adds a new document
      } catch (error) {
        console.log('error creating the user', error.message);
      } 
  }

  return userDocRef;
}
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsFdK7Vwt-uI369UGXNTleIAdrLxGUWX8",
  authDomain: "crwn-store-db-63b1e.firebaseapp.com",
  projectId: "crwn-store-db-63b1e",
  storageBucket: "crwn-store-db-63b1e.appspot.com",
  messagingSenderId: "529173630365",
  appId: "1:529173630365:web:6f04de444fbb0c3cc27374",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;

    try {
      const createdAt = new Date();
      const userData = {
        displayName: displayName,
        email: email,
        createdAt: createdAt,
        ...additionalInfo,
      };
      await setDoc(userDocRef, userData);
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

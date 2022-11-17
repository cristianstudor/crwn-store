import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  Timestamp,
  QueryDocumentSnapshot
} from "firebase/firestore";
import { Category } from "../store/categories/categories.types";
import { TypeCartItem } from "../store/cart/cart.types";

const firebaseConfig = {
  apiKey: "AIzaSyBsFdK7Vwt-uI369UGXNTleIAdrLxGUWX8",
  authDomain: "crwn-store-db-63b1e.firebaseapp.com",
  projectId: "crwn-store-db-63b1e",
  storageBucket: "crwn-store-db-63b1e.appspot.com",
  messagingSenderId: "529173630365",
  appId: "1:529173630365:web:6f04de444fbb0c3cc27374"
};

initializeApp(firebaseConfig);

export const auth = getAuth();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const signInWithGooglePopup = async () =>
  await signInWithPopup(auth, googleProvider);

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

export const db = getFirestore();

export type UserAddress = {
  country: string;
  city: string;
  address: string;
};
export type Order = {
  completed: boolean;
  date: Timestamp;
  total: number;
  orderItems: TypeCartItem[];
};
export type UserData = {
  displayName: string;
  email: string;
  createdAt: Date;
  userAddress: UserAddress;
  ordersHistory: Order[];
};
export type AdditionalInfo = {
  displayName?: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInfo = {} as AdditionalInfo
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      const userData = {
        displayName: displayName,
        email: email,
        createdAt: createdAt,
        userAddress: {
          country: "",
          city: "",
          address: ""
        },
        ordersHistory: [],
        ...additionalInfo
      };
      await setDoc(userDocRef, userData);

      const newUserSnapshot = await getDoc(userDocRef);
      return newUserSnapshot as QueryDocumentSnapshot<UserData>;
    } catch (error) {
      console.log("error creating the user", error);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export type UpdatedUserInfo = {
  displayName: string;
  userAddress: UserAddress;
};
export type UpdatedOrdersHistory = {
  ordersHistory: Order[];
};
export type UpdatedInfo = UpdatedUserInfo | UpdatedOrdersHistory;

export const updateUserDocument = async (
  userAuth: User,
  updatedInfo: UpdatedInfo
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  const userData = {
    ...userSnapshot.data(),
    ...updatedInfo
  };
  await setDoc(userDocRef, userData);
};

export type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("added collection to database");
};

export const getCollectionAndDocuments = async (
  collectionKey: string
): Promise<Category[]> => {
  const collectionRef = collection(db, collectionKey);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );
};

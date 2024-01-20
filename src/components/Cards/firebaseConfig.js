import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, onSnapshot, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { getAuth, setPersistence, browserSessionPersistence, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCICIbqH7KsHULbs4eVhxenNXuT1mn7_LQ",
  authDomain: "hooked-firestore.firebaseapp.com",
  projectId: "hooked-firestore",
  storageBucket: "hooked-firestore.appspot.com",
  messagingSenderId: "39957595285",
  appId: "1:39957595285:web:9ecc93fd00f45fc2f2879c",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Auth state changed
  })
  .catch((error) => {
    // An error occurred
    
  });

export { db, collection, doc, onSnapshot, query, orderBy, limit, getDocs, where, auth, signOut };
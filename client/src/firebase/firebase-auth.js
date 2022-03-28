import { firebaseApp } from './firebase-config';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const signUserInWithGooglePopup = () => {
  signInWithPopup(auth, googleProvider);
};

const signUserOut = () => {
  signOut(auth);
};

export { auth, signUserInWithGooglePopup, signUserOut };

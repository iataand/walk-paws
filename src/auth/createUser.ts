import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase";

export const createUser = function (email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = function (email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = function () {
  return signInWithPopup(auth, new GoogleAuthProvider());
};

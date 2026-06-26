import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';

export const authService = {
  login: async (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  },
  register: async (email: string, pass: string) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  },
  logout: async () => {
    return signOut(auth);
  }
};

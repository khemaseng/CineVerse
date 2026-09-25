import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  type Auth,
  type UserCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Prevent re-initializing on hot reload / multiple imports
export const firebaseApp: FirebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const auth: Auth = getAuth(firebaseApp);

// Initialize OAuth Providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Google Sign In / Register Flow
export async function signInWithGoogle(): Promise<UserCredential> {
  return await signInWithPopup(auth, googleProvider);
}

// GitHub Sign In / Register Flow
export async function signInWithGithub(): Promise<UserCredential> {
  return await signInWithPopup(auth, githubProvider);
}

// Email/Password Sign In Flow
export async function signInWithEmail(email: string, password: string): Promise<UserCredential> {
  return await signInWithEmailAndPassword(auth, email, password);
}

// Email/Password Register Flow
export async function signUpWithEmail(name: string, email: string, password: string): Promise<UserCredential> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (name && userCredential.user) {
    await updateProfile(userCredential.user, { displayName: name });
  }
  return userCredential;
}

// Sign Out Flow
export async function logOut(): Promise<void> {
  await signOut(auth);
}
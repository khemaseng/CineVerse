import {
  signInWithGoogle,
  signInWithGithub,
  signInWithEmail,
  signUpWithEmail,
  logOut,
} from "@/components/Firebase/firebase";
import type { LoginInput, RegisterInput } from "@/lib/validations/auth";
import type { UserCredential } from "firebase/auth";

export function getAuthErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "code" in error) {
    const code = (error as { code: string }).code;
    switch (code) {
      case "auth/email-already-in-use":
        return "An account with this email already exists.";
      case "auth/invalid-email":
        return "The email address is invalid.";
      case "auth/operation-not-allowed":
        return "This sign-in provider is not enabled in Firebase console.";
      case "auth/weak-password":
        return "The password is too weak. Please use at least 6 characters.";
      case "auth/user-disabled":
        return "This user account has been disabled.";
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Invalid email or password. Please check your credentials.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again in a few minutes.";
      case "auth/network-request-failed":
        return "Network connection failed. Please check your internet connection.";
      case "auth/popup-closed-by-user":
        return "Sign-in popup was closed before completing.";
      case "auth/cancelled-popup-request":
        return "Sign-in was cancelled.";
      case "auth/account-exists-with-different-credential":
        return "An account already exists with the same email address using a different sign-in method.";
      default:
        return (error as { message?: string }).message || "An authentication error occurred.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
}

export async function loginWithEmail(data: LoginInput): Promise<UserCredential> {
  return await signInWithEmail(data.email, data.password);
}

export async function registerWithEmail(data: RegisterInput): Promise<UserCredential> {
  return await signUpWithEmail(data.name, data.email, data.password);
}

export async function loginWithGoogle(): Promise<UserCredential> {
  return await signInWithGoogle();
}

export async function loginWithGithub(): Promise<UserCredential> {
  return await signInWithGithub();
}

export async function logoutUser(): Promise<void> {
  await logOut();
}

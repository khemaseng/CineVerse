import { type LoginInput, type RegisterInput } from "@/lib/validations/auth";

export type LocalAccount = {
  name: string;
  email: string;
  salt: string;
  passwordHash: string;
};

export type CurrentUser = {
  name: string;
  email: string;
};

const ACCOUNTS_KEY = "cineverse-demo-accounts";
const SESSION_KEY = "cineverse-demo-session";
const PBKDF2_ITERATIONS = 310_000;

class LocalAuthError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = "LocalAuthError";
  }
}

function getStorage(): Storage {
  if (typeof window === "undefined") {
    throw new Error("Authentication is only available in the browser.");
  }
  return window.localStorage;
}

function readAccounts(): LocalAccount[] {
  const stored = getStorage().getItem(ACCOUNTS_KEY);
  if (!stored) return [];

  try {
    const accounts: unknown = JSON.parse(stored);
    if (!Array.isArray(accounts)) return [];
    return accounts.filter(
      (account): account is LocalAccount =>
        account !== null &&
        typeof account === "object" &&
        typeof account.name === "string" &&
        typeof account.email === "string" &&
        typeof account.salt === "string" &&
        typeof account.passwordHash === "string",
    );
  } catch {
    return [];
  }
}

function writeAccounts(accounts: LocalAccount[]): void {
  getStorage().setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
  return window.btoa(binary);
}

function fromBase64(value: string): Uint8Array {
  return Uint8Array.from(window.atob(value), (character) =>
    character.charCodeAt(0),
  );
}

async function hashPassword(
  password: string,
  salt: Uint8Array,
): Promise<string> {
  const key = await window.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const saltBuffer = new Uint8Array(salt).buffer as ArrayBuffer;
  const bits = await window.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: saltBuffer,
      iterations: PBKDF2_ITERATIONS,
    },
    key,
    256,
  );
  return toBase64(new Uint8Array(bits));
}

// 1. Export function registerWithEmail
export async function registerWithEmail(data: RegisterInput): Promise<void> {
  const accounts = readAccounts();
  const normalizedEmail = data.email.toLowerCase().trim();

  const existingAccount = accounts.find(
    (account) => account.email.toLowerCase() === normalizedEmail,
  );

  if (existingAccount) {
    throw new LocalAuthError(
      "local/email-already-in-use",
      "An account with this email already exists.",
    );
  }

  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const passwordHash = await hashPassword(data.password, salt);

  const newAccount: LocalAccount = {
    name: data.name.trim(),
    email: normalizedEmail,
    salt: toBase64(salt),
    passwordHash,
  };

  accounts.push(newAccount);
  writeAccounts(accounts);
}

// 2. Export function loginWithEmail
export async function loginWithEmail(data: LoginInput): Promise<CurrentUser> {
  const accounts = readAccounts();
  const normalizedEmail = data.email.toLowerCase().trim();

  const account = accounts.find(
    (acc) => acc.email.toLowerCase() === normalizedEmail,
  );

  if (!account) {
    throw new LocalAuthError(
      "local/invalid-credential",
      "Invalid email or password.",
    );
  }

  const salt = fromBase64(account.salt);
  const inputPasswordHash = await hashPassword(data.password, salt);

  if (inputPasswordHash !== account.passwordHash) {
    throw new LocalAuthError(
      "local/invalid-credential",
      "Invalid email or password.",
    );
  }

  const userSession: CurrentUser = {
    name: account.name,
    email: account.email,
  };

  getStorage().setItem(SESSION_KEY, JSON.stringify(userSession));
  return userSession;
}

// 3. Export session helpers
export function getCurrentUser(): CurrentUser | null {
  try {
    const raw = getStorage().getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function logout(): void {
  getStorage().removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("cineverse-auth-change"));
}

// 4. Export getAuthErrorMessage with guaranteed fallback return
export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof LocalAuthError) {
    if (error.code === "local/email-already-in-use") {
      return "An account with this email already exists.";
    }
    if (error.code === "local/invalid-credential") {
      return "Invalid email or password. Please check your credentials.";
    }
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected authentication error occurred. Please try again.";
}

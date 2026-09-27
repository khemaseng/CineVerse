import {
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
} from "@/lib/validations/auth";

type LocalAccount = {
  name: string;
  email: string;
  salt: string;
  passwordHash: string;
};

const ACCOUNTS_KEY = "cineverse-demo-accounts";
const SESSION_KEY = "cineverse-demo-session";
const PBKDF2_ITERATIONS = 310_000;

class LocalAuthError extends Error {
  constructor(public code: string, message: string) {
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

async function hashPassword(password: string, salt: Uint8Array): Promise<string> {
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

export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof LocalAuthError) {
    if (error.code === "local/email-already-in-use") {
      return "An account with this email already exists.";
    }
    if (error.code === "local/invalid-credential") {
      return "Invalid email or password. Please check your credentials.";
    }
  }
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred. Please try again.";
}

export async function registerWithEmail(input: RegisterInput): Promise<void> {
  const data = registerSchema.parse(input);
  const storage = getStorage();
  const accounts = readAccounts();

  if (accounts.some((account) => account.email === data.email)) {
    throw new LocalAuthError(
      "local/email-already-in-use",
      "An account with this email already exists.",
    );
  }

  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const account: LocalAccount = {
    name: data.name,
    email: data.email,
    salt: toBase64(salt),
    passwordHash: await hashPassword(data.password, salt),
  };

  storage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
  storage.setItem(
    SESSION_KEY,
    JSON.stringify({ name: account.name, email: account.email }),
  );
}

export async function loginWithEmail(input: LoginInput): Promise<void> {
  const data = loginSchema.parse(input);
  const account = readAccounts().find((item) => item.email === data.email);

  if (
    !account ||
    (await hashPassword(data.password, fromBase64(account.salt))) !==
      account.passwordHash
  ) {
    throw new LocalAuthError(
      "local/invalid-credential",
      "Invalid email or password.",
    );
  }

  getStorage().setItem(
    SESSION_KEY,
    JSON.stringify({ name: account.name, email: account.email }),
  );
}

export function getCurrentUser(): { name: string; email: string } | null {
  const session = getStorage().getItem(SESSION_KEY);
  if (!session) return null;
  try {
    const user: unknown = JSON.parse(session);
    if (
      user &&
      typeof user === "object" &&
      "name" in user &&
      typeof user.name === "string" &&
      "email" in user &&
      typeof user.email === "string"
    ) {
      return { name: user.name, email: user.email };
    }
  } catch {
    // Ignore an invalid stored session.
  }
  return null;
}

export function logoutUser(): void {
  getStorage().removeItem(SESSION_KEY);
}

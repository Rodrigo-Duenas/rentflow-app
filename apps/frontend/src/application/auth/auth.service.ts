export type SignInInput = {
  email: string;
  password: string;
};

export type SignInResult =
  | { ok: true }
  | { ok: false; code: "INVALID_CREDENTIALS" | "NETWORK" | "UNKNOWN"; message: string };

export interface AuthService {
  signIn(input: SignInInput): Promise<SignInResult>;
}

// Placeholder: reemplazar por Supabase u otro provider.
export class MockAuthService implements AuthService {
  async signIn(_input: SignInInput): Promise<SignInResult> {
    await new Promise((r) => setTimeout(r, 800));
    return { ok: true };
  }
}


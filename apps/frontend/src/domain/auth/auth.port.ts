export type SignInInput = {
  email: string;
  password: string;
};

export type SignInResult =
  | { ok: true }
  | {
      ok: false;
      code: "INVALID_CREDENTIALS" | "NETWORK" | "UNKNOWN";
      message: string;
    };

/** Puerto: la UI y los casos de uso dependen de esto; la infra lo implementa. */
export interface AuthService {
  signIn(input: SignInInput): Promise<SignInResult>;
}

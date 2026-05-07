export type LoginFormState = {
  email: string;
  password: string;
  showPwd: boolean;
  remember: boolean;
  loading: boolean;
};

export type LoginFormActions = {
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  toggleShowPwd: () => void;
  toggleRemember: () => void;
  submit: () => void | Promise<void>;
};


import { useMemo, useState } from "react";

import { MockAuthService } from "../../../../application/auth/auth.service";
import type { LoginFormActions, LoginFormState } from "./login.types";

export const useLoginForm = () => {
  const auth = useMemo(() => new MockAuthService(), []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit: LoginFormActions["submit"] = async () => {
    setLoading(true);
    try {
      await auth.signIn({ email, password });
    } finally {
      setLoading(false);
    }
  };

  const state: LoginFormState = {
    email,
    password,
    showPwd,
    remember,
    loading,
  };

  const actions: LoginFormActions = {
    setEmail,
    setPassword,
    toggleShowPwd: () => setShowPwd((v) => !v),
    toggleRemember: () => setRemember((v) => !v),
    submit,
  };

  return { state, actions } as const;
};


import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import { authRepository } from "./auth.repository.js";

import type { LoginInput, RegisterInput } from "./auth.schema.js";

const JWT_SECRET = process.env.JWT_SECRET ?? "super-secret";

export const authService = {
  register: async (data: RegisterInput) => {
    const existingUser = await authRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("El usuario ya existe");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await authRepository.createUser(data.email, hashedPassword);

    return {
      id: user.id,
      email: user.email,
    };
  },

  login: async (data: LoginInput) => {
    const user = await authRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);

    if (!isValidPassword) {
      throw new Error("Credenciales inválidas");
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    const refreshToken = jwt.sign(
      { userId: user.id, type: "refresh" },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  },
};

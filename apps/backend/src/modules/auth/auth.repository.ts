import { prisma } from "../../shared/database/prisma.js";
export const authRepository = {
  findByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },

  createUser: async (email: string, password: string) => {
    return prisma.user.create({
      data: {
        email,
        password,
      },
    });
  },
};

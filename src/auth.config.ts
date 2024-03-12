import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { LoginSchema } from "@/schemas";
import { getFullUserByEmail } from "@/data/user";
import { getAccountByUserId } from "@/data/account";
import { getImagesByUserId } from "./data/image";

export default {
  providers: [
    GitHub,
    Google,
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getFullUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          const existingAccount = await getAccountByUserId(user.id);

          const userImages = await getImagesByUserId(user.id);

          if (passwordsMatch)
            return {
              ...user,
              isOAuth: !!existingAccount,
              preferences: user.preferences[0],
              images:
                userImages?.map((image) => {
                  return {
                    url: image.url,
                    path: image.path,
                  };
                }) || [],
            };
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { getAccountByUserId } from '@/data/account';

export default {
  providers: [
    GitHub,
    Google,
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          const existingAccount = await getAccountByUserId(user.id);

          if (passwordsMatch)
            return {
              ...user,
              isOAuth: !!existingAccount,
            };
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

import "next-auth/jwt";
import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "./data/user";
import { getAccountByUserId } from "./data/account";

declare module "next-auth" {
  interface User {
    role: UserRole;
    isOAuth: boolean;
    images: {
      url: string;
      path: string;
    }[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
    isOAuth: boolean;
    images: {
      url: string;
      path: string;
    }[];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth providers to sign in without email verification
      if (account?.provider !== "credentials") {
        return true;
      }

      if (user.id) {
        const existingUser = await getUserById(user.id);

        // If the user is not verified, prevent them from signing in
        if (!existingUser?.emailVerified) {
          return false;
        }
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (session.user && token.email) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth;
        session.user.images = token.images;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      if (existingUser.id) {
        const existingAccount = await getAccountByUserId(existingUser.id);

        token.isOAuth = !!existingAccount;
      }

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.images = existingUser.images.map((image) => {
        return {
          url: image.url,
          path: image.path,
        };
      });

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});

import "next-auth/jwt";
import { Gender, GenderPreference, UserRole } from "@prisma/client";
import NextAuth from "next-auth";
import type { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getFullUserById, getUserById } from "./data/user";
import { getAccountByUserId } from "./data/account";

declare module "next-auth" {
  interface User {
    role: UserRole;
    isOAuth: boolean;
    age: number | null;
    bio: string | null;
    location: string | null;
    gender: Gender | null;
    preferences: {
      minAge: number;
      maxAge: number;
      gender: GenderPreference;
    };
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
    image: string | null;
    age: number | null;
    bio: string | null;
    location: string | null;
    gender: Gender | null;
    preferences: {
      minAge: number;
      maxAge: number;
      gender: GenderPreference;
    };
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
      if (account?.provider !== "credentials") {
        return true;
      }

      if (user.id) {
        const existingUser = await getUserById(user.id);
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
        session.user.age = token.age;
        session.user.bio = token.bio;
        session.user.location = token.location;
        session.user.gender = token.gender;
        session.user.image = token.image;
        session.user.preferences = token.preferences;
        session.user.images = token.images;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getFullUserById(token.sub);

      if (!existingUser) return token;

      if (existingUser.id) {
        const existingAccount = await getAccountByUserId(existingUser.id);
        token.isOAuth = !!existingAccount;
      }

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.image = existingUser.image;
      token.age = existingUser.age;
      token.bio = existingUser.bio;
      token.location = existingUser.location;
      token.gender = existingUser.gender;
      token.preferences = existingUser.preferences[0];
      token.images = existingUser.images.map((image) => ({
        url: image.url,
        path: image.path,
      }));

      return token;
    },
  },
  adapter: PrismaAdapter(db) as Adapter, // Указываем тип PrismaAdapter как Adapter
  session: { strategy: "jwt" },
  ...authConfig,
});

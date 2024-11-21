import NextAuth from "next-auth";
import db from "@/server/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "@/server/utils/user";
import { getAccountByUserId } from "@/server/utils/account";
import authConfig from "@/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update
} = NextAuth({
  session: {
    strategy: "jwt"
  },
  adapter: PrismaAdapter(db),
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth",
    error: "/auth/error"
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      };

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.limitLinks = token.limitLinks as number;
      };

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.limitLinks = existingUser.limitLinks;

      return token;
    },
  },
  ...authConfig

})
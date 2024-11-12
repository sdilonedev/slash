import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google"
import db from "./server/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
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
    async signIn({ user, account }) {
      console.log(user, account)
      return true;
    }
  }

})
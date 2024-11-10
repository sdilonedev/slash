import { type DefaultSession } from "next-auth";

export type User = DefaultSession["user"] & {
  username?: string | undefined;
  limitLinks: number;
};

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: User;
  }
}
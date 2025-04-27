import { addNewUser } from "@/services/DbService";
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    userName?: string;
  }

  interface Profile {
    login: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "repo read:user"
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (profile?.login) {
        await addNewUser({ username: profile.login });
      }
      
      return true;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.userName = token.userName as string;
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        const response = await fetch("https://api.github.com/user", {
          headers: { Authorization: `Bearer ${account.access_token}` },
        });

        const profile = await response.json();
        token.accessToken = account.access_token;
        token.userName = profile.login;
      }
      return token;
    },
  },
};
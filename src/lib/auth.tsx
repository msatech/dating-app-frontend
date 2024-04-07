import type {
  NextAuthOptions,
  User as NextAuthUser,
  Account,
  Profile,
  Session,
} from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "./axios";

interface User {
  id: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        otp: { label: "Otp", type: "text" },
      },
      async authorize(
        credentials: Record<"email" | "otp", string> | undefined
      ): Promise<User | null> {
        if (!credentials) {
          return null;
        }
        const { email, otp } = credentials;

        try {
          const response = await axios.post("/auth/verify-otp/", {
            email,
            otp,
          });
          if (
            response.status === 200 &&
            response.data &&
            response.data.userId
          ) {
            const { userId, accessToken, refreshToken } = response.data;
            const user: User = {
              id: userId,
              email,
              accessToken,
              refreshToken,
            };
            return user;
          }
        } catch (error) {
          console.error("API error:", error);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user: NextAuthUser | Account | null;
    }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: any }) {
      session.user = token.user;
      return session;
    },
  },
};

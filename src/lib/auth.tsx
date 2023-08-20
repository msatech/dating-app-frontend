import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "./axios";

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
      ) {
        if (!credentials) {
          return null;
        }
        const { email, otp } = credentials;

        let payload = { email, otp };
        try {
          const response = await axios.post("/auth/verify-otp/", payload);
          if(response.status === 200){
            if(response.data && response.data.userId){
              let userID = response.data.userId
              let { data } = await axios.get(`/users/profile/${userID}`);
              console.log(data, "user Data")
              return data
            }
          }else{
            return 'Invalid Credentails'
          }

        } catch (error) {
          console.error("API error:", error);
          return null; // Handle error case appropriately
        }
      },
    }),
  ],
};

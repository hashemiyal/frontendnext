import { connectedtoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
      },

      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectedtoDB();
          const user = await User.findOne({ email });
       
          if (!user) {
            return null;
          }
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks:{
    async jwt({token, user}){
      if(user){
          token.id = user._id;
          token.username=user.username;
          token.email=user.email;
          token.isAdmin=user.isAdmin;
      }
      return token
  },
    async session({session,token}){
        session.user.id = token.id;
        session.user.email=token.email;
        session.user.username=token.username;
        session.user.isAdmin=token.isAdmin;
        return session;
    }

},
  
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },

}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
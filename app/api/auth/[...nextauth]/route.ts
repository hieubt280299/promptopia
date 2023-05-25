import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";
import { toNonAccentVietnamese } from "@utils";

const handler = NextAuth({
  providers: [GoogleProvider({ clientId: process.env.GOOGLE_ID ?? "", clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "" })],
  callbacks: {
    async session({ session }: any) {
      if (!session) {
        throw new Error("No profile");
      }
      const sessionUser = await User.findOne({
        email: session.user?.email,
      });

      session.user.id = sessionUser._id.toString();
      // console.log("🚀 ~ sessionUser:", sessionUser._id.toString());

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        if (!profile?.name) {
          throw new Error("No profile");
        }

        const userExists = await User.findOne({ email: profile.email });
        // console.log("🚀 ~ userExists:", userExists);

        console.log("🚀 ~ profile:", profile);
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name,
            image: (profile as any).picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

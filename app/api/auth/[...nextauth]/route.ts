import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";
import { z } from "zod";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials, req) {
        // const parsedCredential = z
        //   .object({ email: z.string().email(), password: z.string().min(4) })
        //   .safeParse(credentials);

        // if (parsedCredential.success) {
        //   const { email, password } = parsedCredential.data;

        //   //

        // }

        const response = await sql`
          SELECT * FROM users WHERE email=${credentials?.email}`;
        const user = response.rows[0];

        const passwordCorrect = await compare(
          credentials?.password || "",
          user.password
        );

        console.log({ passwordCorrect });

        if (passwordCorrect) {
          return {
            id: user.id,
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };

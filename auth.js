
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const response = await fetch(
            `${process.env.API_URL}/api/v1/auth/user/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              cache: "no-store",
            }
          )

          console.log(response,"res")
          const result = await response.json();

          if (
            !response.ok ||
            !result.success ||
            !result.data?.token ||
            !result.data?.user
          ) {
            return null;
          }

          const { token, user } = result.data;

          return {
            id: String(user._id || user.id),
            name: user.userName,
            email: user.email,
            role: user.role,
            backendToken: token,
          };

        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.backendToken = user.backendToken;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      // Backend JWT stays out of the client-visible session.
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});

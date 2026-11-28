
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const API = process.env.API_URL;

class BackendError extends CredentialsSignin {
  constructor(message) {
    super();
    this.code = message;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  trustHost: true,

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        let response;
        let result;

        try {
          response = await fetch(`${API}/api/v1/auth/user/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            cache: "no-store",
          });

          result = await response.json();
        } catch (error) {
          throw new BackendError("Cannot reach server");
        }

        if (!response.ok || !result.success) {
          throw new BackendError(
            result.message || "Login failed"
          );
        }

        const { token, user } = result.data || {};

        if (!token || !user) {
          throw new BackendError("Invalid authentication response");
        }

        return {
          id: user.id,
          name: user.userName,
          email: user.email,
          role: user.role,

          // Express JWT
          backendToken: token,
        };
      },
    }),
  ],

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
      session.user.id = token.id;
      session.user.role = token.role;

      // Do not expose backendToken to browser JavaScript.
      return session;
    },
  },
});

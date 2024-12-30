import NextAuth from 'next-auth';
import CredentialProvider, { CredentialInput } from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { googleTokenAdapter, sessionAdapter, tokenAdapter } from '@/adapters/auth';

import { login, strapiProviderLogin } from '@/services';

export const {
  auth,
  signIn,
  signOut,
  unstable_update,
  handlers: { GET, POST }
} = NextAuth({
  trustHost: true,
  session: { strategy: 'jwt' },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        path: '/'
      }
    }
  },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: '/login' },
  providers: [
    CredentialProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {} as Record<string, CredentialInput>,
      async authorize(credentials: any) {
        const response = await login(credentials);

        if (!response?.jwt) {
          throw new Error(response.error, { cause: 'auth' });
        }

        return response;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (account) {
        if (account.provider === 'credentials') {
          return tokenAdapter({ token, user });
        }
        if (account.provider === 'google') {
          const response = await strapiProviderLogin({
            provider: account.provider,
            options: { ...token, access_token: account.access_token }
          });

          if (response?.exist) {
            return tokenAdapter({ token, user: response });
          }

          return googleTokenAdapter({ token, user: response });
        }
      }

      if (trigger === 'update' && session) {
        return { ...token, user: session };
      }

      return token;
    },

    async session({ token, session }: any) {
      session = sessionAdapter({ token });

      return session;
    }
  }
});

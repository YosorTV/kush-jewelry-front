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
  // cookies: {
  //   sessionToken: {
  //     name: `__Secure-next-auth.session-token`,
  //     options: {
  //       httpOnly: process.env.NODE_ENV === 'production',
  //       secure: process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'development',
  //       sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  //       path: '/'
  //     }
  //   }
  // },
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
    async jwt({ token, user, account }) {
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

      return token;
    },

    async session({ token, session }: any) {
      const adaptedSession = sessionAdapter({ token });

      session = adaptedSession;

      return session;
    }
  }
});

import jwt from 'jsonwebtoken';

import { SignInAdapterProps } from '@/types/adapters/auth';

export const sessionAdapter = ({ token }: any) => {
  if (token.provider === 'google') {
    return {
      accessToken: token.accessToken,
      exp: token.exp ?? null,
      user: {
        id: token.id,
        name: token.name,
        email: token.email
      }
    };
  }

  return {
    accessToken: token.accessToken ?? null,
    refreshToken: token.refreshToken ?? null,
    exp: token.expires ?? token.exp ?? null,
    user: token.user ?? null
  };
};

export const tokenAdapter = ({ token, user }: any) => {
  if (!user) return null;

  const decodedTokenData = jwt.decode(user.jwt.accessToken) as any;

  if (decodedTokenData) {
    token.accessToken = user.jwt.accessToken;
    token.refreshToken = user.jwt.refreshToken;
    token.expires = decodedTokenData.exp;
    token.user = {
      id: user.id,
      username: user.username,
      firstName: decodedTokenData.firstName,
      lastName: decodedTokenData.lastName,
      phoneNumber: decodedTokenData.phoneNumber,
      email: decodedTokenData.email,
      date: decodedTokenData?.date,
      city: decodedTokenData?.city,
      cityID: decodedTokenData.cityID,
      warehouse: decodedTokenData.warehouse,
      warehouseID: decodedTokenData.warehouseID
    };

    return token;
  }

  return token;
};

export const googleTokenAdapter = ({ token, user }: any) => {
  token.accessToken = user.jwt;
  token.user = {
    ...user.user,
    username: user.user.username ?? token.name,
    email: user.user.email ?? token.email,
    picture: token.picture
  };

  return token;
};

export const signInParamsAdapter = (credentials: SignInAdapterProps) => {
  if (!credentials) return null;

  return {
    identifier: credentials.identifier,
    password: credentials.password,
    remember: credentials.remember,
    redirect: false
  };
};

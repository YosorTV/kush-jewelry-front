import { Metadata } from 'next';

export interface IGenerateMeta {
  path: string;
  locale: string;
}

export interface MetaImage {
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface MetaSocial {
  socialNetwork: string;
  title?: string;
  description?: string;
  image?: MetaImage;
}

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: MetaImage;
  metaSocial?: MetaSocial[];
  metaRobots?: string;
  keywords?: string;
  metaViewport?: string;
  canonicalURL?: string;
  structuredData?: string;
}

export interface ExtendedMetadata extends Metadata {
  structuredData?: Record<string, any> | null;
  openGraph?: {
    title?: string;
    description?: string;
    images?: { url: string }[];
    siteName?: string;
    locale?: string;
    url?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    images?: string[];
  };
  alternates?: {
    canonical?: string;
  };
  keywords?: string[];
}

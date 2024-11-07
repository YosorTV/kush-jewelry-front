const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');

const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/.well-known/apple-developer-merchantid-domain-association',
        destination: '/.well-known/apple-developer-merchantid-domain-association',
        locale: false
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/.well-known/apple-developer-merchantid-domain-association',
        headers: [
          { key: 'Content-Type', value: 'text/plain' },
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }
        ]
      }
    ];
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  experimental: {
    optimizePackageImports: ['framer-motion']
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    loader: 'custom',
    loaderFile: './lib/strapi.ts',
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'placehold.co'
      }
    ]
  }
};

module.exports = withNextIntl(nextConfig);

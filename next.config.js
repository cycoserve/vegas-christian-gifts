/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.cycoserve.com',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Only run this on the server
    if (isServer) {
      config.resolve.fallback = config.resolve.fallback || {};
      config.resolve.fallback.fs = false;
    }

    return config;
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    NEXT_PUBLIC_API_ACCESS_KEY: process.env.API_ACCESS_KEY,
  },
};

module.exports = nextConfig;
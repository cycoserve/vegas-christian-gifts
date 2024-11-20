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
        hostname: 'fastly.picsum.photo',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.cycoserve.com',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    // Disable cache temporarily to resolve snapshot issues
    config.cache = false;

    // Add watchOptions to handle file system watcher issues
    config.watchOptions = {
      ignored: /node_modules/,
      poll: 1000, // Check for changes every second
    };

    // Preserve existing fallbacks
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    NEXT_PUBLIC_API_ACCESS_KEY: process.env.API_ACCESS_KEY,
  },
};

module.exports = nextConfig;

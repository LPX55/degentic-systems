/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: process.env.NODE_ENV === 'development',
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'kwkvmf3jrprqduii.public.blob.vercel-storage.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'assets.aceternity.com',
            port: '',
          },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack: (config) => {
        config.resolve.fallback = { fs: false, net: false, tls: false };
        config.externals.push('pino-pretty', 'encoding');
        return config;
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
};  

module.exports = nextConfig;

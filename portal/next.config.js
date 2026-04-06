/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.siliconflow.cn',
      },
    ],
  },
};

module.exports = nextConfig;

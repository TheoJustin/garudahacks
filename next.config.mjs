/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "media.licdn.com",
      "miro.medium.com",
      "cdn.prod.website-files.com",
      "images.business.com",
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;

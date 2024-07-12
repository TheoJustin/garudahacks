/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "media.licdn.com",
      "miro.medium.com",
      "cdn.prod.website-files.com",
      "images.business.com",
      "academy.alterra.id",
      "media.dev.to",
      "upload.wikimedia.org",
      "www.nixsolutions.com",
      "online.hbs.edu",
      "go.dev",
      "1000logos.net",
      "miro.medium.com"
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;

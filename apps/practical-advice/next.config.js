/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test   : /\.svg$/i,
      issuer : /\.[jt]sx?$/,
      use    : [ '@svgr/webpack' ],
    });

    return config;
  },
  transpilePackages : [ '@practical/libs' ],
  reactStrictMode   : true,
};

module.exports = nextConfig;

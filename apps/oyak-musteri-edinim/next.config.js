/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales         : [ 'tr' ],
    defaultLocale   : 'tr',
    localeDetection : false,
  },
  webpack: (config) => {
    config.module.rules.push({
      test   : /\.svg$/i,
      issuer : /\.[jt]sx?$/,
      use    : [ '@svgr/webpack' ],
    });

    return config;
  },
  reactStrictMode : true,
  swcMinify       : true,
  output          : 'standalone',
};

module.exports = nextConfig;

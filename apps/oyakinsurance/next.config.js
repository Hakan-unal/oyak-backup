/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales       : [ "tr" ],
    defaultLocale : "tr",
  },
  reactStrictMode : true,
  swcMinify       : true,
};

module.exports = nextConfig;

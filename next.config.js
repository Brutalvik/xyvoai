const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // This disables ESLint during `next build`
    ignoreDuringBuilds: true,
  },
};

module.exports = withNextIntl(nextConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: [
      'gravedigger.backbonelabs.io',
      'www.erisprotocol.com',
      'raw.githubusercontent.com',
      'alliance-dashboard.terra.money'
    ],
  },
};

module.exports = nextConfig;

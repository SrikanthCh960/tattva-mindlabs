import type { NextConfig } from 'next';
const config: NextConfig = {
  output: process.env.TATTVA_STATIC_EXPORT === '1' ? 'export' : 'standalone',
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};
export default config;

const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = withPlugins([
  [withBundleAnalyzer],
  [
    {
      pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
      eslint: {
        dirs: ['src', 'scripts'],
      },
      // https://stackoverflow.com/a/68016564
      images: {
        disableStaticImages: true,
      },
      experimental: { esmExternals: true },
    },
  ],
]);
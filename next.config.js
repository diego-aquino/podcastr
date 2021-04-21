const withImages = require('next-images');

const nextConfig = {
  future: {
    webpack5: true,
  },
  images: {
    domains: ['storage.googleapis.com'],
  },
};

const nextImagesConfig = {
  esModule: true,
};

module.exports = withImages({
  ...nextConfig,
  ...nextImagesConfig,
});

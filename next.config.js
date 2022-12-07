module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  },
  experimental: {
    scrollRestoration: true
  },
  images: {
    unoptimized: true
  }
}

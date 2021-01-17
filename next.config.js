const withCSS = require('@zeit/next-css');
const { parsed: localEnv } = require("dotenv").config();

module.exports = withCSS({
  env: {
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    METEO_ACCESS_TOKEN: process.env.METEO_ACCESS_TOKEN
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

    return config;
  },
  webpackDevMiddleware: config => {
    return config;
  }
});
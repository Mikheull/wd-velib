const withCSS = require('@zeit/next-css');
const { parsed: localEnv } = require("dotenv").config();

module.exports = withCSS({
  target: "serverless",
  env: {
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    METEO_ACCESS_TOKEN: process.env.METEO_ACCESS_TOKEN,
    NOSQL_HOST: process.env.NOSQL_HOST,
    NOSQL_USER: process.env.NOSQL_USER,
    NOSQL_PWD: process.env.NOSQL_PWD,
    NOSQL_TABLE: process.env.NOSQL_TABLE
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

    return config;
  },
  webpackDevMiddleware: config => {
    return config;
  }
});
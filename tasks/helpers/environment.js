const { ENV_DEVELOPMENT, ENV_PRODUCTION } = require('./config');

const isDevelopment = () => {
  return process.env.NODE_ENV === ENV_DEVELOPMENT;
};

const isProduction = () => {
  return process.env.NODE_ENV === ENV_PRODUCTION;
};

module.exports = {
  isDevelopment,
  isProduction,
};

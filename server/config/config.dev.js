const _ = require('lodash');
const defaultConfig = require('./config.default');

/**
 * Configuration for development environment
 */
let devConfig = {
  auth: {
    verifyEmail: true, // If true, require email verification when signing up
    resetPassword: true, // If true, be able to reset password via email
  },
  morgan: {
    format: 'dev', // TODO: possible values: combined, common, dev, short, tiny
  },
  oauth: {},
  seed: {
    logging: true,
    users: [
      {
        username: 'root',
        email: 'root@tdev.app',
        password: 'password',
        firstName: 'Root',
        lastName: 'Account',
        role: 'root',
      },
      {
        username: 'admin',
        email: 'admin@tdev.app',
        password: 'password',
        firstName: 'Admin',
        lastName: 'Account',
        role: 'admin',
      },
      {
        username: 'user',
        email: 'user@tdev.app',
        password: 'password',
        firstName: 'User',
        lastName: 'Account',
        role: 'user',
      },
    ],
  },
};

devConfig = _.merge({}, defaultConfig, devConfig);

module.exports = devConfig;

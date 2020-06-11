const fspath = require('path');

/**
 * Default configuration
 */
let defaultConfig = {
  allowCreatorModify: {
    user: false, // Model name in camel case
    // examplePost: true
  },
  app: {
    name: 'mern', // TODO: Lowercase, URL compatible name
    title: 'MERN Stack', // TODO: Human friendly name
  },
  auth: {
    verifyEmail: false, // If true, require email verification when signing up
    resetPassword: false, // If true, be able to reset password via email
  },
  compression: {
    enabled: true,
    options: null, // See https://www.npmjs.com/package/compression
  },
  cors: {
    enabled: true,
    options: null, // See https://www.npmjs.com/package/cors
  },
  email: {
    from: 'no-reply@tdev.app', // TODO
    to: '',
    signature: 'The MERN Team', // TODO
  },
  jwt: {
    secret: 'This will be overriden by environment variable JWT_SECRET',
    algorithm: 'HS512',
    expiresIn: 60 * 24 * 60 * 60, // seconds
  },
  helmet: {
    enabled: true,
    options: null, // See https://www.npmjs.com/package/helmet
  },
  morgan: {
    enabled: true,
    format: 'dev', // TODO: possible values: combined, common, dev, short, tiny
    options: null, // See https://www.npmjs.com/package/morgan
  },
  mongo: {
    uri: 'This will be overriden by environment variable MONGO_URI',
    testUri: 'mongodb://localhost:27017/mern_test',
  },
  sendgrid: {
    apiKey: 'This will be overriden by environment variable SENDGRID_API_KEY',
  },
  server: {
    host: 'This will be overriden by environment variable SERVER_HOST',
    port: 'This will be overriden by environment variable SERVER_PORT',
    publicUrl:
      'This will be overriden by environment variable SERVER_PUBLIC_URL',
  },
  paths: {
    root: fspath.normalize(`${__dirname}/..`),
  },
  oauth: {
    storeTokens: false, // If true, the OAuth accessToken and refreshToken will be stored in database
    google: {
      clientId:
        'This will be overriden by environment variable GOOGLE_CLIENT_ID',
      clientSecret:
        'This will be overriden by environment variable GOOGLE_CLIENT_SECRET',
    },
    facebook: {
      clientId:
        'This will be overriden by environment variable FACEBOOK_APP_ID',
      clientSecret:
        'This will be overriden by environment variable FACEBOOK_APP_SECRET',
    },
  },
  seed: {
    logging: true,
    users: [],
  },
};

module.exports = defaultConfig;

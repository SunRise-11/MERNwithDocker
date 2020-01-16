const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const uuidv4 = require('uuid/v4');
const config = require('../config');

// Define Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, 'Username is required'],
      match: [
        /^[a-zA-Z0-9.\-_]{4,20}$/,
        'Must be between 4 to 20 characters and may contain only alphanumeric, hyphen, dot or underscore'
      ]
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, 'Email is required'],
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Invalid email'
      ]
    },
    hashedPassword: {
      type: String,
      required: true
    },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    status: {
      type: String,
      enum: ['active', 'deleted', 'unverified'],
      default: 'active',
      index: true
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'root'],
      default: 'user',
      index: true
    },
    permissions: {
      debug: { type: Boolean, default: false },
      readUsers: { type: Boolean, default: false },
      insertUsers: { type: Boolean, default: false },
      updateUsers: { type: Boolean, default: false },
      deleteUsers: { type: Boolean, default: false }
    },
    token: { type: String, index: true }, // Token for veryfication email or reset password purpose, NOT JWT token
    tokenPurpose: { type: String, enum: ['verifyEmail'] }
  },
  { timestamps: true }
);

userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods.toJSON = function() {
  return _.pick(this, [
    'username',
    'email',
    'firstName',
    'lastName',
    'role',
    'permissions'
  ]);
};

userSchema.methods.setPassword = function(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds).then(hash => {
    this.hashedPassword = hash;
  });
};

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.hashedPassword);
};

userSchema.methods.generateJwtToken = function() {
  return jwt.sign({ sub: this._id }, config.jwt.secret, {
    algorithm: config.jwt.algorithm
  });
};

userSchema.methods.setToken = function(purpose) {
  this.token = uuidv4();
  this.tokenPurpose = purpose;
};

userSchema.methods.clearToken = function() {
  this.token = undefined;
  this.tokenPurpose = undefined;
};

userSchema.methods.can = function(action) {
  if (this.role === 'admin' || this.role === 'root') {
    return true;
  }
  return this.permissions[action];
};

mongoose.model('User', userSchema);

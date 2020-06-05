import * as functions from 'firebase-functions';

const mg = require('nodemailer-mailgun-transport');
//const fs = require('fs');

const config = functions.config().env;  

export const fromUser = config.fromUser;

const credentials = {
  auth: {
    api_key: config.api_key,
    domain: config.domain
  }
};

export const auth = mg(credentials);
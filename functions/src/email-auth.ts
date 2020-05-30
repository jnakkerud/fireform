const mg = require('nodemailer-mailgun-transport');

const fs = require('fs');

let configRaw: string;
try {
  configRaw = fs.readFileSync('email-credentials.json');
} catch (err) {
  console.error(err)
  configRaw = `
  {
    "auth": {
      "api_key": "mailgun-api-key",
      "domain": "yourdomain.com"
    },
    "fromUser": "Fireform <user@emaildomain.com>"
  } `;
  console.log('email-credentials.json not found. Using fake credentials');
}

const config = JSON.parse(configRaw);

export const fromUser = config.fromUser;

const credentials = {
  auth: {
    api_key: config.auth.api_key,
    domain: config.auth.domain
  }
};

export const auth = mg(credentials);
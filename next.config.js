require('dotenv').config();

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
const AUTH_SMTP_USER = process.env.AUTH_SMTP_USER;
const AUTH_SMTP_PASS = process.env.AUTH_SMTP_PASS;

module.exports = {
  env: {
    apiUrl: `${SERVER_URL}/admin/api`,
    SMTP_PASS: AUTH_SMTP_PASS,
    SMTP_USER: AUTH_SMTP_USER
  }
};

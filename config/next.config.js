require('dotenv').config();

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';

module.exports = {
  env: {
    apiUrl: `${SERVER_URL}/admin/api`
  }
};

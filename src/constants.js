export const API_URL = 'https://82.200.48.68:8000/';

const https = require('https')

export const agent = new https.Agent({
  rejectUnauthorized: false,
  requestCert: false,
  agent: false,
})
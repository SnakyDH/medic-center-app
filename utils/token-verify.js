import jwt from 'jsonwebtoken';
//import config from '../config/config.js';
const secret = 'cat';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJtZWRpYyIsImlhdCI6MTY3MDI3OTgxNn0.jyu5AqNt54Of1cz0ebSzaIM7nTKbRX2ll_ay4jRFwlg';
function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);

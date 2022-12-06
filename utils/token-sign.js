import jwt from 'jsonwebtoken';
//import config from '../config/config.js';
const secret = 'cat';
const payload = {
  sub: 1,
  role: 'medic',
};

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token);

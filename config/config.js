import dotenv from 'dotenv';

dotenv.config();

export const config = {
  server: {
    port: process.env.PORT,
  },
  db: {
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
  },
};

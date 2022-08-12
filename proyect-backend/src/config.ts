import { config } from 'dotenv';
config();

export default {
  port: process.env.PORT || 4000,
  secret: process.env.JWT_TOKEN_SECRET,
};

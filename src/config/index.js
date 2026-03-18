const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const env = process.env;

const config = {
  port: Number(env.PORT || 5000),
  mongoUri: env.MONGO_URI || 'mongodb://localhost:27017/koaDemo',
  logLevel: env.LOG_LEVEL || 'info',
};

module.exports = config;

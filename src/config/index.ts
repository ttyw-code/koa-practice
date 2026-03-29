import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const env = process.env;

const config = {
  port: Number(env.PORT || 5000),
  mongoUri: env.MONGO_URI || 'mongodb://localhost:27017/koaDemo',
  logLevel: env.LOG_LEVEL || 'info',
};

export default config;

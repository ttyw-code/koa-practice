import mongoose from 'mongoose';
import config from '../config/index.js';

export async function connect(): Promise<typeof mongoose> {
  const uri = config.mongoUri;
  await mongoose.connect(uri);
  return mongoose;
}

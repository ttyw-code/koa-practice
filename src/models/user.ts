import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  age: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IUser>('User', userSchema);

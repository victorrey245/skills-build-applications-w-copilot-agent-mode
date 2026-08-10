import { model, Schema } from 'mongoose';

export interface User {
  name: string;
  username: string;
  email: string;
  role: 'member' | 'coach';
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['member', 'coach'], default: 'member' },
  },
  { timestamps: true },
);

export const UserModel = model<User>('User', userSchema);

import { model, Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['member', 'coach'], default: 'member' },
}, { timestamps: true });
export const UserModel = model('User', userSchema);

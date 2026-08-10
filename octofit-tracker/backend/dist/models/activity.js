import { model, Schema } from 'mongoose';
const activitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['running', 'cycling', 'strength', 'yoga'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true },
}, { timestamps: true });
export const ActivityModel = model('Activity', activitySchema);

import { model, Schema, Types } from 'mongoose';

export interface Activity {
  user: Types.ObjectId;
  type: 'running' | 'cycling' | 'strength' | 'yoga';
  durationMinutes: number;
  caloriesBurned: number;
  completedAt: Date;
}

const activitySchema = new Schema<Activity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['running', 'cycling', 'strength', 'yoga'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export const ActivityModel = model<Activity>('Activity', activitySchema);

import { model, Schema } from 'mongoose';
const workoutSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ['cardio', 'strength', 'mobility'], required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: { type: [String], required: true },
}, { timestamps: true });
export const WorkoutModel = model('Workout', workoutSchema);

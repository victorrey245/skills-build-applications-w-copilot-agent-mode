import { model, Schema } from 'mongoose';

export interface Workout {
  name: string;
  category: 'cardio' | 'strength' | 'mobility';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  exercises: string[];
}

const workoutSchema = new Schema<Workout>(
  {
    name: { type: String, required: true },
    category: { type: String, enum: ['cardio', 'strength', 'mobility'], required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: { type: [String], required: true },
  },
  { timestamps: true },
);

export const WorkoutModel = model<Workout>('Workout', workoutSchema);

import mongoose from 'mongoose';
import { ActivityModel } from '../models/activity.js';
import { LeaderboardModel } from '../models/leaderboard.js';
import { TeamModel } from '../models/team.js';
import { UserModel } from '../models/user.js';
import { WorkoutModel } from '../models/workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            UserModel.deleteMany({}),
            TeamModel.deleteMany({}),
            ActivityModel.deleteMany({}),
            LeaderboardModel.deleteMany({}),
            WorkoutModel.deleteMany({}),
        ]);
        const users = await UserModel.create([
            { name: 'Maya Chen', username: 'mayachen', email: 'maya@example.com', role: 'member' },
            { name: 'Jordan Ellis', username: 'jordanellis', email: 'jordan@example.com', role: 'member' },
            { name: 'Riley Morgan', username: 'rileymorgan', email: 'riley@example.com', role: 'coach' },
        ]);
        const teams = await TeamModel.create([
            { name: 'Summit Striders', description: 'A steady team focused on endurance and consistency.', members: [users[0]._id, users[1]._id] },
            { name: 'Trail Blazers', description: 'Strength and mobility training for an active week.', members: [users[2]._id] },
        ]);
        await Promise.all([
            ActivityModel.create([
                { user: users[0]._id, type: 'running', durationMinutes: 35, caloriesBurned: 320, completedAt: new Date('2026-08-08T07:30:00Z') },
                { user: users[1]._id, type: 'cycling', durationMinutes: 50, caloriesBurned: 410, completedAt: new Date('2026-08-07T18:00:00Z') },
                { user: users[2]._id, type: 'strength', durationMinutes: 45, caloriesBurned: 280, completedAt: new Date('2026-08-09T09:00:00Z') },
            ]),
            LeaderboardModel.create([
                { user: users[0]._id, team: teams[0]._id, points: 1240, rank: 1 },
                { user: users[1]._id, team: teams[0]._id, points: 980, rank: 2 },
                { user: users[2]._id, team: teams[1]._id, points: 860, rank: 3 },
            ]),
            WorkoutModel.create([
                { name: 'Morning Momentum', category: 'cardio', difficulty: 'beginner', durationMinutes: 25, exercises: ['brisk walk', 'high knees', 'cooldown stretch'] },
                { name: 'Full-Body Foundation', category: 'strength', difficulty: 'intermediate', durationMinutes: 40, exercises: ['squats', 'push-ups', 'reverse lunges', 'plank'] },
                { name: 'Reset and Restore', category: 'mobility', difficulty: 'beginner', durationMinutes: 20, exercises: ['cat-cow', 'hip opener', 'child pose'] },
            ]),
        ]);
        console.log('Database seeding complete: 3 users, 2 teams, 3 activities, 3 leaderboard entries, and 3 workouts');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();

import cors from 'cors';
import express from 'express';
import { databaseReady } from './config/database.js';
import { ActivityModel } from './models/activity.js';
import { LeaderboardModel } from './models/leaderboard.js';
import { TeamModel } from './models/team.js';
import { UserModel } from './models/user.js';
import { WorkoutModel } from './models/workout.js';
const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(cors());
app.use(express.json());
const collectionRoute = (resource, query) => async (_request, response) => {
    try {
        response.json({ resource, data: await query() });
    }
    catch (error) {
        console.error(`Error loading ${resource}:`, error);
        response.status(500).json({ error: `Unable to load ${resource}` });
    }
};
app.get('/', (_request, response) => {
    response.json({ name: 'Octofit Tracker API', apiBaseUrl });
});
app.get('/api/users/', collectionRoute('users', () => UserModel.find().sort({ name: 1 }).lean()));
app.get('/api/teams/', collectionRoute('teams', () => TeamModel.find().populate('members', 'name username').sort({ name: 1 }).lean()));
app.get('/api/activities/', collectionRoute('activities', () => ActivityModel.find().populate('user', 'name username').sort({ completedAt: -1 }).lean()));
app.get('/api/leaderboard/', collectionRoute('leaderboard', () => LeaderboardModel.find().populate('user', 'name username').populate('team', 'name').sort({ rank: 1 }).lean()));
app.get('/api/workouts/', collectionRoute('workouts', () => WorkoutModel.find().sort({ name: 1 }).lean()));
databaseReady.then(() => {
    app.listen(port, () => {
        console.log(`Octofit Tracker API listening at ${apiBaseUrl}`);
    });
});

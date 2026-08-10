import ResourceList from './ResourceList'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : '/api/workouts/'

export default function Workouts() {
  return <ResourceList resource="workouts" endpoint={workoutsEndpoint} title="Workouts" description="A focused library for your next session." columns={['Workout', 'Category', 'Difficulty', 'Duration']} renderRow={(workout, index) => (
    <tr key={workout._id || index}><td className="fw-semibold">{workout.name || 'Unnamed workout'}</td><td>{workout.category || '-'}</td><td>{workout.difficulty || '-'}</td><td>{workout.duration ? `${workout.duration} min` : '-'}</td></tr>
  )} />
}
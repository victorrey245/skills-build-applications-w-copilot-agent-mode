import ResourceList from './ResourceList'

export default function Workouts() {
  return <ResourceList resource="workouts" title="Workouts" description="A focused library for your next session." columns={['Workout', 'Category', 'Difficulty', 'Duration']} renderRow={(workout, index) => (
    <tr key={workout._id || index}><td className="fw-semibold">{workout.name || 'Unnamed workout'}</td><td>{workout.category || '-'}</td><td>{workout.difficulty || '-'}</td><td>{workout.duration ? `${workout.duration} min` : '-'}</td></tr>
  )} />
}
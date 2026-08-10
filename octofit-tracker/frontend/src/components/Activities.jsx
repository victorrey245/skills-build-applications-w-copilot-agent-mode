import ResourceList from './ResourceList'

const displayUser = (activity) => activity.user?.name || activity.user?.username || activity.username || 'Unknown athlete'
const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : '/api/activities/'

export default function Activities() {
  return <ResourceList resource="activities" endpoint={activitiesEndpoint} title="Activity feed" description="Recent movement across your Octofit community." columns={['Athlete', 'Activity', 'Duration', 'Completed']} renderRow={(activity, index) => (
    <tr key={activity._id || index}><td>{displayUser(activity)}</td><td className="fw-semibold">{activity.type || activity.activityType || 'Workout'}</td><td>{activity.duration ? `${activity.duration} min` : '-'}</td><td>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : '-'}</td></tr>
  )} />
}
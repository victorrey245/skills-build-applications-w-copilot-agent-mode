import ResourceList from './ResourceList'

const displayUser = (activity) => activity.user?.name || activity.user?.username || activity.username || 'Unknown athlete'

export default function Activities() {
  return <ResourceList resource="activities" title="Activity feed" description="Recent movement across your Octofit community." columns={['Athlete', 'Activity', 'Duration', 'Completed']} renderRow={(activity, index) => (
    <tr key={activity._id || index}><td>{displayUser(activity)}</td><td className="fw-semibold">{activity.type || activity.activityType || 'Workout'}</td><td>{activity.duration ? `${activity.duration} min` : '-'}</td><td>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : '-'}</td></tr>
  )} />
}
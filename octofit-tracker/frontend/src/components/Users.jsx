import ResourceList from './ResourceList'

export default function Users() {
  return <ResourceList resource="users" title="Athletes" description="Your Octofit community, all in one place." columns={['Name', 'Username', 'Email']} renderRow={(user, index) => (
    <tr key={user._id || index}><td className="fw-semibold">{user.name || 'Unnamed athlete'}</td><td>{user.username || '-'}</td><td>{user.email || '-'}</td></tr>
  )} />
}
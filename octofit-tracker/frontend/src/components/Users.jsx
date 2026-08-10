import ResourceList from './ResourceList'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : '/api/users/'

export default function Users() {
  return <ResourceList resource="users" endpoint={usersEndpoint} title="Athletes" description="Your Octofit community, all in one place." columns={['Name', 'Username', 'Email']} renderRow={(user, index) => (
    <tr key={user._id || index}><td className="fw-semibold">{user.name || 'Unnamed athlete'}</td><td>{user.username || '-'}</td><td>{user.email || '-'}</td></tr>
  )} />
}
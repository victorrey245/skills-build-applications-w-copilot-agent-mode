import ResourceList from './ResourceList'

export default function Teams() {
  return <ResourceList resource="teams" title="Teams" description="Find your crew and keep each other moving." columns={['Team', 'Members', 'Created']} renderRow={(team, index) => (
    <tr key={team._id || index}><td className="fw-semibold">{team.name || 'Unnamed team'}</td><td>{team.members?.length ?? team.memberCount ?? 0}</td><td>{team.createdAt ? new Date(team.createdAt).toLocaleDateString() : '-'}</td></tr>
  )} />
}
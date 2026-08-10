import ResourceList from './ResourceList'

export default function Leaderboard() {
  return <ResourceList resource="leaderboard" title="Leaderboard" description="See who is setting the pace this week." columns={['Rank', 'Athlete', 'Team', 'Points']} renderRow={(entry, index) => (
    <tr key={entry._id || index}><td><span className="rank">{entry.rank || index + 1}</span></td><td className="fw-semibold">{entry.user?.name || entry.user?.username || entry.username || 'Unknown athlete'}</td><td>{entry.team?.name || entry.teamName || '-'}</td><td>{entry.points ?? entry.score ?? 0}</td></tr>
  )} />
}
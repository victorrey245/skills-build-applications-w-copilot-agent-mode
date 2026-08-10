import ResourceList from './ResourceList'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : '/api/leaderboard/'

export default function Leaderboard() {
  return <ResourceList resource="leaderboard" endpoint={leaderboardEndpoint} title="Leaderboard" description="See who is setting the pace this week." columns={['Rank', 'Athlete', 'Team', 'Points']} renderRow={(entry, index) => (
    <tr key={entry._id || index}><td><span className="rank">{entry.rank || index + 1}</span></td><td className="fw-semibold">{entry.user?.name || entry.user?.username || entry.username || 'Unknown athlete'}</td><td>{entry.team?.name || entry.teamName || '-'}</td><td>{entry.points ?? entry.score ?? 0}</td></tr>
  )} />
}
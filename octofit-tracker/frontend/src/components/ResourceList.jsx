import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

export default function ResourceList({ resource, title, description, columns, renderRow }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    fetchCollection(resource)
      .then((data) => active && setItems(data))
      .catch((requestError) => active && setError(requestError.message))
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [resource])

  return (
    <section className="resource-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Octofit Tracker</p>
          <h1>{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <span className="count-badge">{loading ? '...' : `${items.length} records`}</span>
      </div>

      {loading && <div className="status-panel">Loading {title.toLowerCase()}...</div>}
      {error && <div className="status-panel status-error">{error}</div>}
      {!loading && !error && (
        <div className="table-wrap">
          <table className="table tracker-table align-middle mb-0">
            <thead>
              <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr><td colSpan={columns.length} className="empty-state">No records yet.</td></tr>
              ) : items.map((item, index) => renderRow(item, index))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
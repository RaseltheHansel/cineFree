import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchAll } from '../lib/api'
import { MovieCard } from '../ui/MovieCard'

export const Search = () => {
  const [query, setQuery] = useState('')

  const { data = [], isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: () => searchAll(query),
    enabled: query.trim().length > 2,
  })

  const filtered = useMemo(
    () => data.filter((item) => item.media_type === 'movie' || item.media_type === 'tv'),
    [data]
  )
  const total = useMemo(() => filtered.length, [filtered])

  return (
    <div className="page">
      <section className="page-header">
        <div>
          <h1>Search</h1>
          <p>Find any title across movies, series, cartoons, or anime.</p>
        </div>
        <div className="search-input">
          <input
            type="text"
            placeholder="Search for a title, director, or keyword..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </section>

      <section className="grid-section">
        {!query && <p className="status">Start typing to search.</p>}
        {query && isLoading && <p className="status">Searching...</p>}
        {query && !isLoading && !filtered.length && (
          <p className="status">No results found.</p>
        )}
        {query && !!filtered.length && (
          <p className="status">{total} results</p>
        )}
        <div className="movie-grid">
          {filtered.map((item) => (
            <MovieCard
              key={item.id}
              item={item}
              mediaType={item.media_type}
              region="PH"
            />
          ))}
        </div>
      </section>
    </div>
  )
}

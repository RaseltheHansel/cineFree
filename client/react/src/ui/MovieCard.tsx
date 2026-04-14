import type { TmdbItem } from '../types'
import { formatRating, getPosterUrl, getTitle, getYear } from '../utils/formatters'

type Props = {
  item: TmdbItem
  mediaType?: 'movie' | 'tv'
  region?: string
}

export const MovieCard = ({ item, mediaType, region = 'PH' }: Props) => {
  const poster = getPosterUrl(item)
  const type = item.media_type ?? mediaType ?? 'movie'
  if (type !== 'movie' && type !== 'tv') return null

  const handleOpen = () => {
    window.open(`https://www.themoviedb.org/${type}/${item.id}`, '_blank')
  }

  const handleWatch = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    try {
      const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5000'
      const response = await fetch(
        `${baseUrl}/api/movies/providers/${type}/${item.id}?region=${region}`
      )
      const data = await response.json()
      const link =
        data?.link ?? `https://www.themoviedb.org/${type}/${item.id}`
      window.open(link, '_blank')
    } catch {
      handleOpen()
    }
  }

  return (
    <article
      className="movie-card"
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') handleOpen()
      }}
    >
      <div className="movie-poster">
        {poster ? (
          <img src={poster} alt={getTitle(item)} loading="lazy" />
        ) : (
          <div className="poster-fallback">No Poster</div>
        )}
        <span className="rating">{formatRating(item.vote_average)}</span>
      </div>
      <div className="movie-info">
        <h3>{getTitle(item)}</h3>
        <p>{getYear(item)}</p>
        <button className="watch-button" type="button" onClick={handleWatch}>
          Where to Watch
        </button>
      </div>
    </article>
  )
}

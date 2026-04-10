import type { TmdbItem } from '../types'
import { formatRating, getPosterUrl, getTitle, getYear } from '../utils/formatters'

type Props = {
  item: TmdbItem
}

export const MovieCard = ({ item }: Props) => {
  const poster = getPosterUrl(item)

  return (
    <article className="movie-card">
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
      </div>
    </article>
  )
}

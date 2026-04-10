import type { TmdbItem } from '../types'

const POSTER_BASE = 'https://image.tmdb.org/t/p/w500'

export const getTitle = (item: TmdbItem) => item.title ?? item.name ?? 'Untitled'

export const getYear = (item: TmdbItem) => {
  const date = item.release_date ?? item.first_air_date
  if (!date) return 'N/A'
  return date.split('-')[0]
}

export const getPosterUrl = (item: TmdbItem) =>
  item.poster_path ? `${POSTER_BASE}${item.poster_path}` : ''

export const formatRating = (value?: number) => {
  if (!value && value !== 0) return 'NR'
  return value.toFixed(1)
}

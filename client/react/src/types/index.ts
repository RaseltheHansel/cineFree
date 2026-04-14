export type MediaType = 'movie' | 'tv' | 'person'
export type DiscoverGroup = 'movies' | 'series' | 'cartoons' | 'anime'
export type FilterType = 'latest' | 'oldest' | 'trending'
export type CartoonFilter = 'latest' | 'oldest' | 'anime' | 'series'

export type Country = {
  iso_3166_1: string
  english_name: string
  native_name: string
}

export type TmdbItem = {
  id: number
  title?: string
  name?: string
  poster_path?: string | null
  overview?: string
  release_date?: string
  first_air_date?: string
  vote_average?: number
  media_type?: MediaType
}

export type TrendingPayload = {
  movies: TmdbItem[]
  tv: TmdbItem[]
}

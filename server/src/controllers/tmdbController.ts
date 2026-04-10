import axios from 'axios';
import { withCache } from '../config/redis';
 
const tmdb = axios.create({
  baseURL: process.env.TMDB_BASE_URL,
  params: { api_key: process.env.TMDB_API_KEY }
});
 
// Latest movies by country — 1 hour TTL
export const getLatestMovies = async (region: string) =>
  withCache(`latest:movies:${region}`, 3600,
    () => tmdb.get('/movie/now_playing', {
      params: { region, language: 'en-US', page: 1 }
    }).then(r => r.data.results)
);
 
// Oldest movies — 24 hour TTL (classics don't change)
export const getOldestMovies = async (region: string) =>
  withCache(`oldest:movies:${region}`, 86400,
    () => tmdb.get('/discover/movie', {
      params: { region, sort_by: 'release_date.asc',
                'release_date.gte': '1900-01-01',
                'vote_count.gte': 10, page: 1 }
    }).then(r => r.data.results)
);
 
// Trending — 15 minute TTL (changes frequently)
export const getTrending = async (type: 'movie' | 'tv' = 'movie') =>
  withCache(`trending:${type}`, 900,
    () => tmdb.get(`/trending/${type}/day`).then(r => r.data.results)
);
 
// Search — 30 minute TTL
export const searchAll = async (query: string) =>
  withCache(`search:${encodeURIComponent(query)}`, 1800,
    () => tmdb.get('/search/multi', {
      params: { query, include_adult: false }
    }).then(r => r.data.results)
);
 
// Country list — 7 day TTL (almost never changes)
export const getCountries = async () =>
  withCache('config:countries', 604800,
    () => tmdb.get('/configuration/countries').then(r => r.data)
);
 

// Latest animated films — 1 hour TTL
export const getLatestCartoons = async (region: string) =>
  withCache(`latest:cartoons:${region}`, 3600,
    () => tmdb.get('/discover/movie', {
      params: { region, with_genres: '16',
                sort_by: 'release_date.desc',
                'vote_count.gte': 5, page: 1 }
    }).then(r => r.data.results)
);
 
// Classic cartoons from 1920s — 24 hour TTL
export const getOldestCartoons = async (region: string) =>
  withCache(`oldest:cartoons:${region}`, 86400,
    () => tmdb.get('/discover/movie', {
      params: { region, with_genres: '16',
                sort_by: 'release_date.asc',
                'release_date.gte': '1920-01-01',
                'vote_count.gte': 10, page: 1 }
    }).then(r => r.data.results)
);
 
// Animated TV series by country — 1 hour TTL
export const getLatestAnimatedSeries = async (region: string) =>
  withCache(`latest:animated-series:${region}`, 3600,
    () => tmdb.get('/discover/tv', {
      params: { with_genres: '16', sort_by: 'first_air_date.desc',
                watch_region: region, 'vote_count.gte': 5, page: 1 }
    }).then(r => r.data.results)
);
 
// Anime by keyword 210024 (Japanese animation) — 1 hour TTL
export const getAnime = async () =>
  withCache('latest:anime', 3600,
    () => tmdb.get('/discover/tv', {
      params: { with_genres: '16', with_keywords: '210024',
                sort_by: 'popularity.desc', page: 1 }
    }).then(r => r.data.results)
);

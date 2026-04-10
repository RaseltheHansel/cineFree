import axios from 'axios'
import type { CartoonFilter, Country, DiscoverGroup, FilterType, MediaType, TmdbItem } from '../types'

const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5000'

const api = axios.create({
  baseURL: `${baseUrl}/api`,
})

export const getCountries = async (): Promise<Country[]> => {
  const { data } = await api.get('/movies/countries')
  return data
}

export const getLatest = async (region: string, type: MediaType) => {
  const { data } = await api.get('/movies/latest', { params: { region, type } })
  return data as TmdbItem[]
}

export const getOldest = async (region: string, type: MediaType) => {
  const { data } = await api.get('/movies/oldest', { params: { region, type } })
  return data as TmdbItem[]
}

export const getTrending = async (type: MediaType) => {
  const { data } = await api.get('/movies/trending', { params: { type } })
  return data as TmdbItem[]
}

export const searchAll = async (query: string) => {
  const { data } = await api.get('/movies/search', { params: { q: query } })
  return data as TmdbItem[]
}

export const getCartoons = async (region: string, filter: CartoonFilter, type: MediaType) => {
  const params: Record<string, string> = { region }
  if (filter === 'anime') params.filter = 'anime'
  else if (filter === 'oldest') params.filter = 'oldest'
  else params.filter = 'latest'

  params.type = type
  const { data } = await api.get('/cartoons', { params })
  return data as TmdbItem[]
}

export const getDiscoverItems = async (
  group: DiscoverGroup,
  region: string,
  filter: FilterType,
  cartoonFilter: CartoonFilter
) => {
  if (group === 'movies') {
    if (filter === 'latest') return getLatest(region, 'movie')
    if (filter === 'oldest') return getOldest(region, 'movie')
    return getTrending('movie')
  }

  if (group === 'series') {
    if (filter === 'latest') return getLatest(region, 'tv')
    if (filter === 'oldest') return getOldest(region, 'tv')
    return getTrending('tv')
  }

  if (group === 'cartoons') {
    if (cartoonFilter === 'series') return getCartoons(region, 'latest', 'tv')
    if (cartoonFilter === 'anime') return getCartoons(region, 'anime', 'tv')
    return getCartoons(region, cartoonFilter, 'movie')
  }

  return getCartoons(region, 'anime', 'tv')
}

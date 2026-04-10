import { useQuery } from '@tanstack/react-query'
import { getCountries, getDiscoverItems } from '../lib/api'
import type { CartoonFilter, DiscoverGroup, FilterType } from '../types'

export const useCountries = () =>
  useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  })

export const useDiscover = (
  group: DiscoverGroup,
  region: string,
  filter: FilterType,
  cartoonFilter: CartoonFilter
) =>
  useQuery({
    queryKey: ['discover', group, region, filter, cartoonFilter],
    queryFn: () => getDiscoverItems(group, region, filter, cartoonFilter),
  })

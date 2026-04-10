import { useMemo, useState } from 'react'
import { CartoonSubFilter } from '../ui/CartoonSubFilter'
import { ContentTypeTabs } from '../ui/ContentTypeTabs'
import { CountryPicker } from '../ui/CountryPicker'
import { FilterBar } from '../ui/FilterBar'
import { MovieCard } from '../ui/MovieCard'
import { useCountries, useDiscover } from '../hooks/useMovies'
import type { CartoonFilter, DiscoverGroup, FilterType } from '../types'

export const Discover = () => {
  const [group, setGroup] = useState<DiscoverGroup>('movies')
  const [filter, setFilter] = useState<FilterType>('latest')
  const [cartoonFilter, setCartoonFilter] = useState<CartoonFilter>('latest')
  const { data: countries = [] } = useCountries()
  const [region, setRegion] = useState('US')

  const handleGroupChange = (nextGroup: DiscoverGroup) => {
    setGroup(nextGroup)
    if (nextGroup === 'anime') setCartoonFilter('anime')
  }

  const { data = [], isLoading, isError } = useDiscover(
    group,
    region,
    filter,
    cartoonFilter
  )

  const regionName = useMemo(() => {
    const match = countries.find((country) => country.iso_3166_1 === region)
    return match?.english_name ?? 'United States'
  }, [countries, region])

  return (
    <div className="page">
      <section className="page-header">
        <div>
          <h1>Discover</h1>
          <p>
            Explore {regionName} releases across movies, series, cartoons, and
            anime.
          </p>
        </div>
        <CountryPicker countries={countries} value={region} onChange={setRegion} />
      </section>

      <ContentTypeTabs value={group} onChange={handleGroupChange} />

      {group === 'cartoons' || group === 'anime' ? (
        <CartoonSubFilter value={cartoonFilter} onChange={setCartoonFilter} />
      ) : (
        <FilterBar value={filter} onChange={setFilter} />
      )}

      <section className="grid-section">
        {isLoading && <p className="status">Loading fresh titles...</p>}
        {isError && (
          <p className="status error">Unable to load data. Try again soon.</p>
        )}
        {!isLoading && !data.length && (
          <p className="status">No results yet. Try a different filter.</p>
        )}
        <div className="movie-grid">
          {data.map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  )
}

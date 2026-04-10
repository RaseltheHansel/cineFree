import type { FilterType } from '../types'

type Props = {
  value: FilterType
  onChange: (value: FilterType) => void
}

const options: { label: string; value: FilterType }[] = [
  { label: 'Latest', value: 'latest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Trending', value: 'trending' },
]

export const FilterBar = ({ value, onChange }: Props) => (
  <div className="filters">
    {options.map((option) => (
      <button
        key={option.value}
        className={`filter-pill ${value === option.value ? 'active' : ''}`}
        onClick={() => onChange(option.value)}
        type="button"
      >
        {option.label}
      </button>
    ))}
  </div>
)

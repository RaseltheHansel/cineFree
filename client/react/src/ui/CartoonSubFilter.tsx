import type { CartoonFilter } from '../types'

type Props = {
  value: CartoonFilter
  onChange: (value: CartoonFilter) => void
}

const options: { label: string; value: CartoonFilter }[] = [
  { label: 'Latest', value: 'latest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Anime', value: 'anime' },
  { label: 'Animated Series', value: 'series' },
]

export const CartoonSubFilter = ({ value, onChange }: Props) => (
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

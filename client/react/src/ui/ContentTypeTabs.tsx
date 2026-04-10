import type { DiscoverGroup } from '../types'

type Props = {
  value: DiscoverGroup
  onChange: (value: DiscoverGroup) => void
}

const options: { label: string; value: DiscoverGroup }[] = [
  { label: 'Movies', value: 'movies' },
  { label: 'Series', value: 'series' },
  { label: 'Cartoons', value: 'cartoons' },
  { label: 'Anime', value: 'anime' },
]

export const ContentTypeTabs = ({ value, onChange }: Props) => (
  <div className="tabs">
    {options.map((option) => (
      <button
        key={option.value}
        className={`tab ${value === option.value ? 'active' : ''}`}
        onClick={() => onChange(option.value)}
        type="button"
      >
        {option.label}
      </button>
    ))}
  </div>
)

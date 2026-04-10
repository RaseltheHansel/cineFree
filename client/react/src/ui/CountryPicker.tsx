import type { Country } from '../types'

type Props = {
  countries: Country[]
  value: string
  onChange: (value: string) => void
}

export const CountryPicker = ({ countries, value, onChange }: Props) => (
  <label className="control">
    <span>Country</span>
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      {countries.map((country) => (
        <option key={country.iso_3166_1} value={country.iso_3166_1}>
          {country.english_name}
        </option>
      ))}
    </select>
  </label>
)

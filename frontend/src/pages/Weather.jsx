import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Weather() {
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_KEY = '0f361259c5d84e4ea07152856231105' // WeatherAPI.com key

  // List of countries with their codes
  const countries = [
    { name: 'Pakistan', code: 'PK' },
    { name: 'United States', code: 'US' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'India', code: 'IN' },
    { name: 'China', code: 'CN' },
    { name: 'Australia', code: 'AU' },
    { name: 'Canada', code: 'CA' },
    { name: 'Germany', code: 'DE' },
    { name: 'France', code: 'FR' },
    { name: 'Japan', code: 'JP' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'Turkey', code: 'TR' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Thailand', code: 'TH' },
    { name: 'South Korea', code: 'KR' },
    { name: 'Russia', code: 'RU' },
    { name: 'Brazil', code: 'BR' }
  ].sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically
  
  const fetchWeather = async (e) => {
    e?.preventDefault()
    if (!city) return
    
    setLoading(true)
    setError(null)
    try {
      // Include country code in the query if selected
      const query = selectedCountry 
        ? `${city},${selectedCountry}` 
        : city
      
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}&aqi=no`
      )
      setWeather(response.data)
      console.log('Weather data:', response.data)
    } catch (err) {
      console.error('Full error:', err.response || err)
      setError('City not found. Please check the spelling and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Weather Check</h1>
      <form onSubmit={fetchWeather} style={{ 
        maxWidth: '500px',
        margin: '2rem 0'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Select Country</label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              marginBottom: '1rem',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          >
            <option value="">-- Select a country --</option>
            {countries.map(country => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>

          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Enter City Name</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={selectedCountry ? `Enter city in ${countries.find(c => c.code === selectedCountry)?.name}` : "Enter city name"}
            required
            style={{ 
              width: '100%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
          <small style={{ 
            display: 'block', 
            marginTop: '0.5rem', 
            color: '#666',
            fontSize: '0.85rem' 
          }}>
            {selectedCountry 
              ? `Enter a city in ${countries.find(c => c.code === selectedCountry)?.name}`
              : 'Select a country first (optional)'}
          </small>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Checking...' : 'Check Weather'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {weather && (
        <div style={{
          backgroundColor: '#b31a1aff',
          padding: '2rem',
          borderRadius: '8px',
          maxWidth: '500px'
        }}>
          <h2>{weather.location.name}, {weather.location.country}</h2>
          <p style={{ color: '#666' }}>{weather.location.region}</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginTop: '1rem'
          }}>
            <div>
              <h3>Temperature</h3>
              <p>{weather.current.temp_c}°C</p>
              <p>Feels like: {weather.current.feelslike_c}°C</p>
            </div>
            <div>
              <h3>Conditions</h3>
              <p>{weather.current.condition.text}</p>
              <img 
                src={weather.current.condition.icon} 
                alt={weather.current.condition.text}
                style={{ width: '64px', height: '64px' }}
              />
            </div>
            <div>
              <h3>Details</h3>
              <p>Humidity: {weather.current.humidity}%</p>
              <p>UV Index: {weather.current.uv}</p>
            </div>
            <div>
              <h3>Wind</h3>
              <p>{weather.current.wind_kph} km/h</p>
              <p>Direction: {weather.current.wind_dir}</p>
            </div>
          </div>
          <div style={{ 
            marginTop: '1rem',
            fontSize: '0.9em',
            color: '#666',
            textAlign: 'right' 
          }}>
            Last updated: {weather.current.last_updated}
          </div>
        </div>
      )}
    </div>
  )
}
import { useState, useEffect } from 'react'

export default function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedTimezone, setSelectedTimezone] = useState('Asia/Karachi')

  // List of common timezones with their UTC offsets
  const timezones = [
    { name: 'Pakistan (Karachi)', zone: 'Asia/Karachi', offset: 5, label: 'Pakistan Time' },
    { name: 'UK (London)', zone: 'Europe/London', offset: 0, label: 'British Time' },
    { name: 'USA (New York)', zone: 'America/New_York', offset: -5, label: 'Eastern Time' },
    { name: 'UAE (Dubai)', zone: 'Asia/Dubai', offset: 4, label: 'Gulf Time' },
    { name: 'Japan (Tokyo)', zone: 'Asia/Tokyo', offset: 9, label: 'Japan Time' },
    { name: 'China (Beijing)', zone: 'Asia/Shanghai', offset: 8, label: 'China Time' },
    { name: 'Australia (Sydney)', zone: 'Australia/Sydney', offset: 11, label: 'Australian Eastern Time' },
    { name: 'Germany (Berlin)', zone: 'Europe/Berlin', offset: 1, label: 'Central European Time' },
    { name: 'India (Mumbai)', zone: 'Asia/Kolkata', offset: 5.5, label: 'India Time' }
  ]

  // Get current timezone info
  const getCurrentTimezone = () => {
    return timezones.find(tz => tz.zone === selectedTimezone) || timezones[0]
  }

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Get time for selected timezone
  const getTimeForTimezone = () => {
    const timezone = timezones.find(tz => tz.zone === selectedTimezone)
    if (!timezone) return currentTime

    const utc = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000)
    return new Date(utc + (3600000 * timezone.offset))
  }

  // Format the time for display
  const formatTime = (date) => {
    return {
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      }),
      date: date.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      backgroundColor: 'white',
      minHeight: '80vh'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        color: '#333',
        marginBottom: '2rem'
      }}>World Clock</h1>
      
      <div style={{
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <label 
          htmlFor="timezone-select" 
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#666',
            fontSize: '1.1rem'
          }}
        >
          Select Location
        </label>
        <select
          id="timezone-select"
          value={selectedTimezone}
          onChange={(e) => setSelectedTimezone(e.target.value)}
          style={{
            padding: '0.8rem',
            fontSize: '1.1rem',
            borderRadius: '8px',
            border: '2px solid #090606ff',
            backgroundColor: 'white',
            minWidth: '250px',
            cursor: 'pointer',
            outline: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            color: '#be2d90dd'
          }}
        >
          {timezones.map(tz => (
            <option key={tz.zone} value={tz.zone}>
              {tz.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '3rem',
        borderRadius: '16px',
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        minWidth: '350px',
        border: '2px solid #eee'
      }}>
        <div style={{
          fontSize: '3.5rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: '#2c3e50',
          fontFamily: 'monospace',
          letterSpacing: '2px'
        }}>
          {formatTime(getTimeForTimezone()).time}
        </div>
        <div style={{
          fontSize: '1.4rem',
          color: '#34495e',
          marginBottom: '1.5rem',
          fontWeight: '500'
        }}>
          {formatTime(getTimeForTimezone()).date}
        </div>
        <div style={{
          fontSize: '1.1rem',
          color: '#7f8c8d',
          marginBottom: '0.5rem'
        }}>
          {getCurrentTimezone().name}
        </div>
        <div style={{
          fontSize: '1rem',
          color: '#95a5a6',
          fontWeight: '500'
        }}>
          {getCurrentTimezone().label}
        </div>
      </div>
    </div>
  )
}
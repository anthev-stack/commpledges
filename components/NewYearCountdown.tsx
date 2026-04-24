"use client"

import { useState, useEffect } from 'react'

export default function NewYearCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isNewYear, setIsNewYear] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const nextNewYear = new Date()
      nextNewYear.setFullYear(nextNewYear.getFullYear() + 1)
      nextNewYear.setMonth(0, 1) // January 1st
      nextNewYear.setHours(0, 0, 0, 0) // Midnight
      
      const difference = nextNewYear.getTime() - now
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        
        setTimeLeft({ days, hours, minutes, seconds })
        setIsNewYear(false)
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setIsNewYear(true)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  if (isNewYear) {
    return (
      <div className="newyear-message">
        HAPPY NEW YEARS
      </div>
    )
  }

  return (
    <div className="newyear-countdown">
      <div className="countdown-item">
        <span className="countdown-number">{timeLeft.days.toString().padStart(2, '0')}</span>
        <span className="countdown-label">Days</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-number">{timeLeft.hours.toString().padStart(2, '0')}</span>
        <span className="countdown-label">Hours</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-number">{timeLeft.minutes.toString().padStart(2, '0')}</span>
        <span className="countdown-label">Minutes</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-number">{timeLeft.seconds.toString().padStart(2, '0')}</span>
        <span className="countdown-label">Seconds</span>
      </div>
    </div>
  )
}

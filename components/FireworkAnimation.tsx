"use client"

import { useEffect, useState } from 'react'

interface Firework {
  id: number
  left: number
  color: string
  delay: number
}

export default function FireworkAnimation() {
  const [fireworks, setFireworks] = useState<Firework[]>([])

  useEffect(() => {
    const colors = [
      '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
      '#ff8000', '#8000ff', '#ff0080', '#80ff00', '#0080ff', '#ffa500'
    ]

    let fireworkId = 0

    const createFirework = () => {
      const newFirework: Firework = {
        id: fireworkId++,
        left: 10 + Math.random() * 80, // Random position between 10% and 90%
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: 0
      }

      setFireworks(prev => [...prev, newFirework])

      // Remove firework after animation completes
      setTimeout(() => {
        setFireworks(prev => prev.filter(fw => fw.id !== newFirework.id))
      }, 3000)
    }

    // Create initial firework
    createFirework()

    // Create new fireworks at intervals
    const interval = setInterval(createFirework, 1500 + Math.random() * 1500) // Every 1.5-3 seconds

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      {fireworks.map(firework => (
        <div
          key={firework.id}
          className="firework-css"
          style={{
            left: `${firework.left}%`,
            ['--firework-color' as string]: firework.color,
            animationDelay: `${firework.delay}ms`
          }}
        />
      ))}
    </>
  )
}

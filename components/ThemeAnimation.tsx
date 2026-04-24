"use client"

import { useTheme } from './ThemeProvider'
import FlyingAnimation from './FlyingAnimation'
import FireworkAnimation from './FireworkAnimation'
import { useState, useEffect } from 'react'

export default function ThemeAnimation() {
  const { themeName } = useTheme()
  const [batGif, setBatGif] = useState<string>('/images/bat.gif')
  const [snowflakeGif, setSnowflakeGif] = useState<string>('/images/snowflake.gif')

  useEffect(() => {
    // Fetch custom GIFs from database
    const fetchGifs = async () => {
      try {
        const [batRes, snowflakeRes] = await Promise.all([
          fetch('/api/admin/upload-gif?type=bat').catch(() => null),
          fetch('/api/admin/upload-gif?type=snowflake').catch(() => null)
        ])

        if (batRes?.ok) {
          const batData = await batRes.json()
          if (batData.dataUrl) setBatGif(batData.dataUrl)
        }

        if (snowflakeRes?.ok) {
          const snowflakeData = await snowflakeRes.json()
          if (snowflakeData.dataUrl) setSnowflakeGif(snowflakeData.dataUrl)
        }
      } catch (error) {
        console.error('Failed to fetch custom GIFs:', error)
        // Fallback to default GIFs in public folder
      }
    }

    fetchGifs()
  }, [])

  // Parallax effect for New Year stars
  useEffect(() => {
    if (themeName !== 'newyear') return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const parallaxOffset = scrollY * 0.1 // Very subtle movement - 10% of scroll distance
      
      const starsElement = document.querySelector('body.theme-newyear::before')
      if (starsElement) {
        ;(starsElement as HTMLElement).style.transform = `translateY(${parallaxOffset}px)`
      }
      
      // Alternative approach: directly modify the CSS custom property
      document.documentElement.style.setProperty('--stars-parallax', `${parallaxOffset}px`)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [themeName])

  if (themeName === 'halloween') {
    return (
      <FlyingAnimation
        imageUrl={batGif}
        count={15}
        speed={2}
        size={25}
        enabled={true}
      />
    )
  }

  if (themeName === 'christmas') {
    return (
      <FlyingAnimation
        imageUrl={snowflakeGif}
        count={25}
        speed={1.5}
        size={20}
        enabled={true}
      />
    )
  }

  if (themeName === 'newyear') {
    return <FireworkAnimation />
  }

  return null
}

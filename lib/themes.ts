export interface Theme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
  }
  description: string
}

export const THEMES: Record<string, Theme> = {
  default: {
    id: 'default',
    name: 'Default',
    colors: {
      primary: '#10b981',
      secondary: '#059669',
      accent: '#34d399',
      background: '#0f1419',
      surface: '#1a1f2e',
      text: '#ffffff',
      textSecondary: '#9ca3af',
    },
    description: 'Clean green theme',
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    colors: {
      primary: '#10b981',
      secondary: '#059669',
      accent: '#34d399',
      background: '#0f1419',
      surface: '#1a1f2e',
      text: '#ffffff',
      textSecondary: '#9ca3af',
    },
    description: 'Dark theme with green accents',
  },
  halloween: {
    id: 'halloween',
    name: 'Halloween',
    colors: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      accent: '#a78bfa',
      background: '#0f1419',
      surface: '#1a1f2e',
      text: '#ffffff',
      textSecondary: '#9ca3af',
    },
    description: 'Spooky purple theme',
  },
  christmas: {
    id: 'christmas',
    name: 'Christmas',
    colors: {
      primary: '#3b82f6',
      secondary: '#2563eb',
      accent: '#60a5fa',
      background: '#0f1419',
      surface: '#1a1f2e',
      text: '#ffffff',
      textSecondary: '#9ca3af',
    },
    description: 'Festive blue theme',
  },
  newyear: {
    id: 'newyear',
    name: 'New Year',
    colors: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      accent: '#a78bfa',
      background: '#0f1419',
      surface: '#1a1f2e',
      text: '#ffffff',
      textSecondary: '#9ca3af',
    },
    description: 'Celebratory purple theme',
  },
}

export function getTheme(themeId: string): Theme {
  return THEMES[themeId] || THEMES.default
}

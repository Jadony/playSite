/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        game: {
          background: '#0D0D0D', // Figma Background
          surface: '#1A1A1A',     // Slights lighter background
          primary: '#DE0DFF',     // Magenta
          secondary: '#6E00FF',   // Royal Purple
          highlight: '#FFFFFF',
          muted: '#B3B3B3',
          dark: '#0a0e1a',        // Keep existing legacy
          darker: '#050810',
          purple: '#a855f7',
          'purple-dark': '#7e22ce',
          gold: '#fbbf24',
          blue: '#3b82f6',
          'card-bg': '#1a1f2e',
          'card-hover': '#242938',
        }
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(90deg, #DE0DFF 0%, #6E00FF 100%)', // The main action gradient
        'gradient-purple': 'linear-gradient(135deg, #a855f7 0%, #c026d3 100%)',
        'gradient-purple-dark': 'linear-gradient(135deg, #7e22ce 0%, #9333ea 100%)',
        'gradient-game': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-gold': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'gradient-cosmic': 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
      },
      backdropBlur: {
        xs: '2px',
        md: '12px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-up': 'scaleUp 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(168, 85, 247, 0.8)' },
        }
      },
      boxShadow: {
        'purple': '0 0 20px rgba(168, 85, 247, 0.3)',
        'purple-lg': '0 0 40px rgba(168, 85, 247, 0.4)',
        'glow': '0 0 30px rgba(168, 85, 247, 0.6)',
        'magenta-glow': '0 0 15px rgba(222, 13, 255, 0.4)',
      }
    },
  },
  plugins: [],
}

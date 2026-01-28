import React from 'react'
import { useNavigate } from 'react-router-dom'

const games = [
  { id: 1, name: 'League of Legend', icon: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=64&q=80' },
  { id: 2, name: 'League of Legend', icon: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=64&q=80' },
  { id: 3, name: 'PUBG Mobile', icon: 'https://images.unsplash.com/photo-1593305841991-05c29736f4de?auto=format&fit=crop&w=64&q=80' },
  { id: 4, name: 'PUBG Mobile', icon: 'https://images.unsplash.com/photo-1593305841991-05c29736f4de?auto=format&fit=crop&w=64&q=80' },
  { id: 5, name: 'Genshin Impact', icon: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?auto=format&fit=crop&w=64&q=80' },
  { id: 6, name: 'Genshin Impact', icon: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?auto=format&fit=crop&w=64&q=80' },
  { id: 7, name: 'Zenless Zone Zero', icon: 'https://images.unsplash.com/photo-1629759868770-07e9973887c3?auto=format&fit=crop&w=64&q=80' },
  { id: 8, name: 'Zenless Zone Zero', icon: 'https://images.unsplash.com/photo-1629759868770-07e9973887c3?auto=format&fit=crop&w=64&q=80' },
  { id: 9, name: 'Honkai Star Rail', icon: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=64&q=80' },
  { id: 10, name: 'Honkai Star Rail', icon: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=64&q=80' },
  { id: 11, name: 'MarvelRivals', icon: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=64&q=80' },
  { id: 12, name: 'PUBG Mobile', icon: 'https://images.unsplash.com/photo-1593305841991-05c29736f4de?auto=format&fit=crop&w=64&q=80' },
  { id: 13, name: 'Wuthering Waves', icon: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=64&q=80' },
  { id: 14, name: 'League of Legend', icon: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=64&q=80' },
  { id: 15, name: 'Wuthering Waves', icon: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=64&q=80' },
]

const sidebarGames = [
  'PUBG Mobile', 'Genshin Impact', 'Zenless Zone Zero', 'Honkai Star Rail', 
  'MarvelRivals', 'Wuthering Waves', 'Wuthering Waves', 'Wuthering Waves'
]

interface GamesDropdownProps {
  onClose: () => void;
}

const GamesDropdown: React.FC<GamesDropdownProps> = ({ onClose }) => {
  const navigate = useNavigate()

  return (
    <div className="absolute top-full left-0 mt-4 w-[800px] h-[550px] bg-[#1a1a1a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex animate-fade-in z-50">
      {/* Left: Popular Games Grid */}
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-2 gap-4">
          {games.map((game, index) => (
            <div 
              key={`${game.id}-${index}`}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
              onClick={() => {
                // Handle game click if needed
                onClose()
              }}
            >
              <img src={game.icon} alt={game.name} className="w-10 h-10 rounded-lg object-cover bg-gray-800" />
              <span className="text-gray-300 group-hover:text-white transition-colors text-sm font-medium">{game.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Sidebar List */}
      <div className="w-64 bg-[#222] p-4 flex flex-col gap-2 border-l border-white/5">
        <div 
          onClick={() => {
            navigate('/games')
            onClose()
          }}
          className="flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl cursor-pointer transition-colors mb-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="text-white font-medium">All games</span>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-1">
          {sidebarGames.map((game, index) => (
            <div 
              key={index}
              className="px-3 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer transition-colors text-sm"
              onClick={() => onClose()} // Or navigate to specific game
            >
              {game}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GamesDropdown

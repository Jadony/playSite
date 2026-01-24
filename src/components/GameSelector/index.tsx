import React from 'react'

const GameSelector: React.FC = () => {
    const popularGames = [
        { id: 'hsr', name: 'Honkai: Star Rail' },
        { id: 'zzz', name: 'Zenless Zone Zero' },
        { id: 'genshin', name: 'Genshin Impact' },
        { id: 'wuwa', name: 'Wuthering Waves' }
    ]

    const games = [
        { id: 'lol', name: 'League of Legend', image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=600&auto=format&fit=crop', active: true },
        { id: 'pubg', name: 'PUBG Mobile', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop', active: false },
        { id: 'apex', name: 'Apex Legends', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop', active: false },
    ]

    return (
        <section className="w-full px-4 md:px-12 lg:px-24 mb-16">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Search & Tags */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search for game names or keywords"
                            className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-game-primary/50 transition-colors"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <span className="text-gray-400 text-sm mr-2 py-1.5">Popular:</span>
                        {popularGames.map(game => (
                            <button key={game.id} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                                {game.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Horizontal Game Slider */}
                <div className="flex items-center gap-6 overflow-x-auto pb-8 pt-4 scrollbar-hide snap-x">
                    {games.map((game) => (
                        <div
                            key={game.id}
                            className={`
                        relative flex-shrink-0 cursor-pointer transition-all duration-500 ease-out group snap-center
                        ${game.active ? 'w-64 h-80 z-10' : 'w-48 h-64 grayscale opacity-60 hover:opacity-100 hover:grayscale-0'}
                    `}
                        >
                            <div
                                className={`
                            absolute inset-0 rounded-2xl overflow-hidden border-2 
                            ${game.active ? 'border-game-primary shadow-glow' : 'border-transparent'}
                            transform transition-transform skew-x-[-2deg]
                        `}
                            >
                                <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                    <p className={`font-bold ${game.active ? 'text-white text-lg' : 'text-gray-300 text-sm'}`}>{game.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default GameSelector

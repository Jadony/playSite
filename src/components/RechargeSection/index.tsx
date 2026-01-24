import React from 'react'

const RechargeSection: React.FC = () => {
    const products = Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        title: '6480 Genesis Crystals',
        price: '$99.99',
        original: '$120.00',
        discount: '-18%',
        image: 'https://images.unsplash.com/photo-1612152605347-f93296cb657d?auto=format&fit=crop&q=80&w=300'
    }))

    return (
        <section className="w-full px-4 md:px-12 lg:px-24 mb-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* RIGHT SIDE (Actually Left in Figma visual hierarchy usually, but let's stick to the analysis: Sidebar Left, Grid Right) */}
                {/* CHECKING FIGMA ANALYSIS: "Order Sidebar (Left)" "Product Grid (Right)" */}

                {/* LEFT SIDEBAR: Order Form */}
                <div className="lg:col-span-3 h-fit sticky top-24 space-y-4">
                    {/* Ticker */}
                    <div className="bg-game-surface border border-white/5 rounded-xl p-3 flex items-center gap-2 overflow-hidden">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <p className="text-xs text-gray-400 whitespace-nowrap">User 183***923 bought 6480 Crystals...</p>
                    </div>

                    {/* Form Panel */}
                    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 shadow-2xl">
                        <h3 className="text-white font-bold mb-4">Recharge Info</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Recharge Method</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white outline-none focus:border-game-primary">
                                    <option>UID Top-up</option>
                                    <option>Direct Gift</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Area / Server</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white outline-none focus:border-game-primary">
                                    <option>America</option>
                                    <option>Europe</option>
                                    <option>Asia</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Game ID (UID)</label>
                                <input type="text" placeholder="Enter UID" className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white outline-none focus:border-game-primary" />
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <div className="flex justify-between items-end mb-4">
                                    <span className="text-gray-400 text-sm">Total:</span>
                                    <span className="text-game-primary font-bold text-2xl">$0.00</span>
                                </div>
                                <button className="w-full py-3 rounded-xl bg-gradient-main text-white font-bold shadow-magenta-glow hover:opacity-90 transition-opacity">
                                    Trade Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT GRID: Product Items */}
                <div className="lg:col-span-9">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {products.map((item) => (
                            <div key={item.id} className="group relative bg-[#121212] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2">
                                {/* Dazzling Gradient Border Effect */}
                                <div className="absolute inset-0 p-[1px] bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-2xl group-hover:from-game-primary group-hover:to-game-secondary group-hover:via-purple-400 transition-all duration-500 opacity-60 group-hover:opacity-100">
                                    <div className="absolute inset-0 bg-transparent" />
                                </div>

                                {/* Inner Content Wrapper */}
                                <div className="relative h-full bg-[#121212] rounded-2xl overflow-hidden m-[1px]">
                                    {/* Discount Badge with Glow */}
                                    <div className="absolute top-0 right-0 z-20">
                                        <div className="bg-game-primary px-3 py-1 rounded-bl-xl shadow-lg shadow-purple-500/30">
                                            <span className="text-xs font-black text-white tracking-wider">{item.discount}</span>
                                        </div>
                                    </div>

                                    {/* Image with Shine Effect */}
                                    <div className="aspect-square w-full overflow-hidden bg-white/5 relative">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-4 relative">
                                        <h4 className="text-gray-200 text-sm font-bold line-clamp-2 min-h-[40px] group-hover:text-white transition-colors">{item.title}</h4>
                                        <div className="mt-3 flex items-baseline justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-white font-black text-lg drop-shadow-md">{item.price}</span>
                                                <span className="text-gray-600 text-xs line-through decoration-gray-500">{item.original}</span>
                                            </div>
                                            <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                                                <span className="text-lg">+</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}

export default RechargeSection

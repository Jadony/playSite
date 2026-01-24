import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const HeroSection: React.FC = () => {
    const navigate = useNavigate()
    const [currentIndex, setCurrentIndex] = useState(1) // Start at middle (index 1)

    const slides = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop',
            title: 'League of Legends',
            subtitle: 'Unlock exclusive skins.',
            chars: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=600&auto=format&fit=crop'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1612152605347-f93296cb657d?auto=format&fit=crop&q=80&w=2600',
            title: 'Genshin Impact',
            subtitle: 'New Archon Quest Available.',
            chars: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2600&auto=format&fit=crop',
            title: 'Valorant',
            subtitle: 'Episode 7 Act 2 is here.',
            chars: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop'
        }
    ]

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length)
    }

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
    }

    // Get visible indices for circular logic
    const getVisibleSlides = () => {
        const prev = (currentIndex - 1 + slides.length) % slides.length
        const next = (currentIndex + 1) % slides.length
        return { prev, current: currentIndex, next }
    }

    const { prev, current, next } = getVisibleSlides()

    return (
        <section className="relative w-full h-[700px] overflow-hidden bg-game-darker flex flex-col justify-center">

            {/* Background Ambience (Blur of current image) */}
            <div className="absolute inset-0 z-0">
                <img src={slides[current].image} alt="bg" className="w-full h-full object-cover blur-[100px] opacity-30 transition-all duration-1000" />
            </div>

            {/* 3D Carousel Container */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto h-[500px] flex items-center justify-center perspective-[1200px]">

                {/* PREV SLIDE (Left) */}
                <div
                    onClick={handlePrev}
                    className="absolute left-[5%] md:left-[10%] w-[500px] h-[350px] transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] cursor-pointer opacity-40 hover:opacity-60 transform -translate-x-16 scale-90 -rotate-y-12 blur-[1px] grayscale hover:grayscale-0 z-10 hover:z-20"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                        <div className="absolute inset-0 bg-black/40 z-10 transition-colors duration-500 hover:bg-black/20" />
                        <img src={slides[prev].image} alt="" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* NEXT SLIDE (Right) */}
                <div
                    onClick={handleNext}
                    className="absolute right-[5%] md:right-[10%] w-[500px] h-[350px] transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] cursor-pointer opacity-40 hover:opacity-60 transform translate-x-16 scale-90 rotate-y-12 blur-[1px] grayscale hover:grayscale-0 z-10 hover:z-20"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                        <div className="absolute inset-0 bg-black/40 z-10 transition-colors duration-500 hover:bg-black/20" />
                        <img src={slides[next].image} alt="" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* CURRENT SLIDE (Center) */}
                <div className="relative w-[800px] h-[450px] z-30 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] transform scale-100 shadow-[0_0_60px_rgba(0,0,0,0.6)] rounded-3xl overflow-hidden border border-white/10 bg-black/50">
                    {/* Image */}
                    <img src={slides[current].image} alt={slides[current].title} className="w-full h-full object-cover" />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Content Content inside Card */}
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                        <h2 className="text-5xl font-black text-white mb-2 drop-shadow-lg transform translate-y-0 opacity-100 transition-all duration-700 delay-200">
                            {slides[current].title}
                        </h2>
                        <p className="text-xl text-gray-200 mb-6 drop-shadow-md transform translate-y-0 opacity-100 transition-all duration-700 delay-300">
                            {slides[current].subtitle}
                        </p>
                        <button
                            onClick={() => navigate('/games')}
                            className="px-8 py-3 rounded-full bg-gradient-main text-white font-bold shadow-magenta-glow hover:scale-105 transition-transform duration-300"
                        >
                            Play Now
                        </button>
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={handlePrev}
                    className="absolute left-4 md:left-12 z-40 w-12 h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                    <LeftOutlined style={{ fontSize: '20px' }} />
                </button>

                <button
                    onClick={handleNext}
                    className="absolute right-4 md:right-12 z-40 w-12 h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                    <RightOutlined style={{ fontSize: '20px' }} />
                </button>

            </div>
        </section>
    )
}

export default HeroSection

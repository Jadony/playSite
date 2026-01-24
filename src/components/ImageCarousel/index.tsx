import React, { useState, useEffect } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import './style.css'

interface CarouselImage {
    id: string
    src: string
    alt: string
    title?: string
}

interface ImageCarouselProps {
    images: CarouselImage[]
    autoPlayInterval?: number
    showControls?: boolean
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
    images,
    autoPlayInterval = 5000,
    showControls = true,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        if (autoPlayInterval && images.length > 1) {
            const timer = setInterval(() => {
                handleNext()
            }, autoPlayInterval)

            return () => clearInterval(timer)
        }
    }, [currentIndex, autoPlayInterval, images.length])

    const handleNext = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setCurrentIndex((prev) => (prev + 1) % images.length)
        setTimeout(() => setIsAnimating(false), 600)
    }

    const handlePrev = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
        setTimeout(() => setIsAnimating(false), 600)
    }

    const handleDotClick = (index: number) => {
        if (isAnimating || index === currentIndex) return
        setIsAnimating(true)
        setCurrentIndex(index)
        setTimeout(() => setIsAnimating(false), 600)
    }

    const getItemClass = (index: number) => {
        const diff = (index - currentIndex + images.length) % images.length

        if (diff === 0) return 'carousel-item active'
        if (diff === 1 || diff === images.length - 1) {
            return `carousel-item side ${diff === 1 ? 'next' : 'prev'}`
        }
        return 'carousel-item hidden'
    }

    if (!images || images.length === 0) {
        return null
    }

    return (
        <div className="image-carousel">
            <div className="carousel-container">
                <div className="carousel-track">
                    {images.map((image, index) => (
                        <div key={image.id} className={getItemClass(index)}>
                            <div className="carousel-image-wrapper">
                                <img src={image.src} alt={image.alt} className="carousel-image" />
                                {image.title && (
                                    <div className="carousel-image-title">{image.title}</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {showControls && images.length > 1 && (
                    <>
                        <button
                            className="carousel-control prev"
                            onClick={handlePrev}
                            disabled={isAnimating}
                            aria-label="Previous slide"
                        >
                            <LeftOutlined />
                        </button>
                        <button
                            className="carousel-control next"
                            onClick={handleNext}
                            disabled={isAnimating}
                            aria-label="Next slide"
                        >
                            <RightOutlined />
                        </button>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className="carousel-dots">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => handleDotClick(index)}
                            disabled={isAnimating}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ImageCarousel

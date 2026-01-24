import React from 'react'
import { Card } from 'antd'
import './style.css'

interface GameCardProps {
    id: string
    title: string
    image: string
    price: string
    discount?: number
    popular?: boolean
    onClick?: () => void
}

const GameCard: React.FC<GameCardProps> = ({
    title,
    image,
    price,
    discount,
    popular,
    onClick,
}) => {
    return (
        <Card
            hoverable
            className="game-card"
            onClick={onClick}
            cover={
                <div className="game-card-image-wrapper">
                    <img alt={title} src={image} className="game-card-image" />
                    {discount && (
                        <div className="discount-badge">
                            {discount}%
                        </div>
                    )}
                    {popular && (
                        <div className="popular-badge">
                            🔥 Popular
                        </div>
                    )}
                </div>
            }
        >
            <div className="game-card-content">
                <h3 className="game-card-title">{title}</h3>
                <div className="game-card-footer">
                    <span className="game-card-price">{price}</span>
                    <button className="game-card-button">Buy Now</button>
                </div>
            </div>
        </Card>
    )
}

export default GameCard

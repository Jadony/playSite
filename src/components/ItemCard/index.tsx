import React from 'react'
import './style.css'

interface ItemCardProps {
    id: string
    name: string
    image: string
    price: string
    quality?: 'common' | 'rare' | 'epic' | 'legendary'
    selected?: boolean
    onSelect?: (id: string) => void
}

const ItemCard: React.FC<ItemCardProps> = ({
    id,
    name,
    image,
    price,
    quality = 'common',
    selected = false,
    onSelect,
}) => {
    const qualityColors = {
        common: 'rgba(156, 163, 175, 0.3)',
        rare: 'rgba(59, 130, 246, 0.3)',
        epic: 'rgba(168, 85, 247, 0.3)',
        legendary: 'rgba(251, 191, 36, 0.3)',
    }

    return (
        <div
            className={`item-card ${selected ? 'selected' : ''} ${quality}`}
            onClick={() => onSelect?.(id)}
        >
            <div className="item-card-image-wrapper" style={{ background: qualityColors[quality] }}>
                <img src={image} alt={name} className="item-card-image" />
                <div className="price-tag">{price}</div>
            </div>
            <div className="item-card-name">{name}</div>
        </div>
    )
}

export default ItemCard

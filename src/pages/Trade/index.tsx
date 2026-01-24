import React, { useState } from 'react'
import { Button, Row, Col, Pagination } from 'antd'
import ItemCard from '@components/ItemCard'
import './style.css'

const Trade: React.FC = () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    // Mock trade items
    const items = Array.from({ length: 7 }, (_, i) => ({
        id: `item-${i}`,
        name: ['Zombie Dart Box', 'Esports Zone Box', 'Legends Case', 'Golden Karambit', 'AK-47 Neon', 'Zombie Dart Box', 'Crystal Butterfly'][i],
        image: `https://picsum.photos/seed/trade${i}/200/200`,
        price: `22%`,
        quality: (['epic', 'legendary', 'epic', 'legendary', 'rare', 'epic', 'rare'] as const)[i],
    }))

    const handleSelectItem = (id: string) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        )
    }

    const totalValue = selectedItems.length * 0 // Mock calculation

    return (
        <div className="trade-page">
            <div className="trade-container">
                {/* Header */}
                <div className="trade-header">
                    <div className="user-avatar">
                        <span>👤</span>
                    </div>
                    <h2 className="trade-title">My Trading Items</h2>
                </div>

                {/* Items Grid */}
                <Row gutter={[16, 16]} className="trade-grid">
                    {items.map((item) => (
                        <Col key={item.id} xs={12} sm={8} md={6} lg={4}>
                            <ItemCard
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                price={item.price}
                                quality={item.quality}
                                selected={selectedItems.includes(item.id)}
                                onSelect={handleSelectItem}
                            />
                        </Col>
                    ))}
                </Row>

                {/* Footer */}
                <div className="trade-footer">
                    <div className="trade-total">
                        <span className="total-label">Total Value:</span>
                        <span className="total-value">$ {totalValue}</span>
                    </div>
                    <Button type="primary" size="large" className="trade-button">
                        Trade Now
                    </Button>
                </div>

                {/* Pagination */}
                <div className="trade-pagination">
                    <Pagination
                        defaultCurrent={1}
                        total={50}
                        showSizeChanger={false}
                        className="pagination-controls"
                    />
                </div>
            </div>
        </div>
    )
}

export default Trade

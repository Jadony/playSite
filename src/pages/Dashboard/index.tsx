import React from 'react'
import { Tabs, Button, Select } from 'antd'
import ItemCard from '@components/ItemCard'
import './style.css'

const { TabPane } = Tabs
const { Option } = Select

const Dashboard: React.FC = () => {
    // Mock data
    const items = Array.from({ length: 12 }, (_, i) => ({
        id: `item-${i}`,
        name: 'Zombie Dart Box',
        image: `https://picsum.photos/seed/dash${i}/200/200`,
        price: `$ 200.00`,
        quality: (['epic', 'legendary', 'rare'] as const)[i % 3],
    }))

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                {/* Left Sidebar */}
                <div className="dashboard-sidebar">
                    <div className="user-profile-section">
                        <div className="user-avatar-large">
                            <img src="https://picsum.photos/seed/avatar/200/200" alt="User" />
                        </div>
                        <div className="user-stats">
                            <div className="stat-item">
                                <span className="stat-label">Rating</span>
                                <span className="stat-value">07100</span>
                            </div>
                        </div>
                    </div>

                    <nav className="dashboard-nav">
                        <a href="#community" className="nav-item active">👥 Community</a>
                        <a href="#game-info" className="nav-item">🎮 Select the Game</a>
                        <a href="#server" className="nav-item">🌐 Server</a>
                        <a href="#self-service" className="nav-item">⚙️ Self-service settings</a>
                        <a href="#account" className="nav-item">👤 Account</a>
                        <a href="#transactions" className="nav-item">💳 Transactions</a>
                        <a href="#support" className="nav-item">💬 Support</a>
                    </nav>

                    <div className="promotion-card">
                        <div className="promo-content">
                            <h4>How to Sell items on<br />our Site</h4>
                            <Button size="small">Read More</Button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="dashboard-main">
                    {/* Character Preview */}
                    <div className="character-section">
                        <div className="character-display">
                            <div className="character-avatar">
                                <img src="https://picsum.photos/seed/char/300/400" alt="Character" />
                            </div>
                        </div>

                        <div className="item-showcase">
                            <div className="showcase-slot empty">
                                <span>+</span>
                            </div>
                            <div className="showcase-slot empty">
                                <span>+</span>
                            </div>
                            <div className="showcase-slot empty">
                                <span>+</span>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="filters-section">
                        <Tabs defaultActiveKey="all" className="category-tabs">
                            <TabPane tab="Community" key="community" />
                            <TabPane tab="Transaction history" key="transactions" />
                            <TabPane tab="Compare prices" key="compare" />
                            <TabPane tab="Settings" key="settings" />
                        </Tabs>

                        <div className="filter-controls">
                            <Select defaultValue="all" style={{ width: 200 }}>
                                <Option value="all">All Items</Option>
                                <Option value="weapons">Weapons</Option>
                                <Option value="skins">Skins</Option>
                            </Select>

                            <Select defaultValue="price-high" style={{ width: 200 }}>
                                <Option value="price-high">Price: High to Low</Option>
                                <Option value="price-low">Price: Low to High</Option>
                            </Select>
                        </div>
                    </div>

                    {/* Items Grid */}
                    <div className="dashboard-items-grid">
                        {items.map((item) => (
                            <ItemCard
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                price={item.price}
                                quality={item.quality}
                            />
                        ))}
                    </div>

                    {/* Transaction List */}
                    <div className="transaction-list">
                        <h3>Recent Transactions</h3>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="transaction-item">
                                <img src={`https://picsum.photos/seed/trans${i}/60/60`} alt="Item" />
                                <div className="transaction-info">
                                    <span className="transaction-name">Zombie Dart Box</span>
                                    <span className="transaction-date">2024-01-{20 + i}</span>
                                </div>
                                <div className="transaction-price">$ 200.00</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

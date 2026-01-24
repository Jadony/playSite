import React, { useState } from 'react'
import { Row, Col, Pagination } from 'antd'
import SearchBar from '@components/SearchBar'
import GameCard from '@components/GameCard'
import './style.css'

const Games: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 20
    const totalGames = 2544

    // Mock game data
    const games = Array.from({ length: pageSize }, (_, i) => ({
        id: `game-${i}`,
        title: ['Genshin Impact', 'Zenless Zone Zero', 'League of Legend', 'Honkai Star Rail', 'PUBG Mobile', 'Mobile Legends:Bang Bang', 'Valorant', 'Honor of Kings', 'Legends of Runeterra', 'Tom and Jerry: Chase', 'Wuthering Waves', 'Arema Breakout', 'MarvelRivals', 'Delta Force'][i % 14],
        image: `https://picsum.photos/seed/${i}/300/400`,
        price: `Top-up game available 0.1$`,
        discount: [0, 20, 15, 0, 25, 20, 0, 15, 30, 0, 20, 25, 15, 0][i % 14] || undefined,
        popular: i % 5 === 0,
    }))

    return (
        <div className="games-page">
            <div className="games-container">
                {/* Header */}
                <div className="games-header">
                    <h1 className="games-title">All Games</h1>
                    <SearchBar placeholder="Search for game names or keywords" />
                </div>

                {/* Games Grid */}
                <Row gutter={[24, 24]} className="games-grid">
                    {games.map((game) => (
                        <Col key={game.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                            <GameCard
                                id={game.id}
                                title={game.title}
                                image={game.image}
                                price={game.price}
                                discount={game.discount}
                                popular={game.popular}
                            />
                        </Col>
                    ))}
                </Row>

                {/* Pagination */}
                <div className="games-pagination">
                    <span className="pagination-info">
                        Viewing items {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, totalGames)} of {totalGames}
                    </span>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={totalGames}
                        onChange={setCurrentPage}
                        showSizeChanger={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default Games

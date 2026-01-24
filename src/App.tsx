import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import Header from '@components/common/Header'
import Footer from '@components/common/Footer'
import Home from '@pages/Home'
import Recharge from '@pages/Recharge'
import History from '@pages/History'
import Profile from '@pages/Profile'
import Games from '@pages/Games'
import Trade from '@pages/Trade'
import Checkout from '@pages/Checkout'
import Invite from '@pages/Invite'
import Dashboard from '@pages/Dashboard'

const { Content } = Layout

function App() {
  return (
    <Layout className="min-h-screen bg-game-dark">
      <Header />
      <Content className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recharge" element={<Recharge />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/games" element={<Games />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/invite" element={<Invite />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Content>
      <Footer />
    </Layout>
  )
}

export default App


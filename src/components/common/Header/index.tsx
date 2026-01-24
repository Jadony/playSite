import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import LoginModal from '@components/LoginModal'

const { Header: AntHeader } = Layout

const Header: React.FC = () => {
  const location = useLocation()
  const [loginModalVisible, setLoginModalVisible] = useState(false)

  const isActive = (path: string) => location.pathname === path

  const menuItems: { key: string; label: string; path: string; icon?: React.ReactNode }[] = [
    { key: '/', label: 'Home', path: '/' },
    { key: '/games', label: 'Games', path: '/games' },
    { key: '/invite', label: 'Play with friends', path: '/invite', icon: <span className="mr-1">🔥</span> },
    { key: '/suggested', label: 'Suggestion', path: '/suggested' },
    { key: '/help', label: 'Help Center', path: '/help' },
  ]

  return (
    <>
      {/* 1. FIXED LEFT: LOGO */}
      <div className="fixed top-6 left-8 z-50 animate-fade-in">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 backdrop-blur-md shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] group-hover:bg-white/10 transition-all">
            <span className="text-xl">⚡</span>
          </div>
          <span className="text-white font-bold text-xl tracking-wide hidden sm:block drop-shadow-md group-hover:text-game-primary transition-colors">LOGO</span>
        </Link>
      </div>

      {/* 2. FIXED CENTER: MENU ONLY */}
      <div className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-6 px-4 pointer-events-none">
        <div
          className="pointer-events-auto h-14 flex items-center justify-center transition-all duration-300 px-2"
          style={{
            background: 'rgba(255, 255, 255, 0.1)', // 90% Transparency (10% Opacity)
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '100px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="flex items-center gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-500 relative group overflow-hidden ${isActive(item.path)
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                  }`}
              >
                {/* Active/Hover Highlight - smoother */}
                <span className={`absolute inset-0 rounded-full transition-all duration-500 ease-out ${isActive(item.path) ? 'bg-white/20 opacity-100 shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]' : 'bg-white/5 opacity-0 group-hover:opacity-100'
                  }`} />

                <div className="relative z-10 flex items-center gap-2">
                  {item.label}
                  {item.path === '/invite' && <span className="text-xs animate-pulse">🔥</span>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 3. FIXED RIGHT: USER ACTIONS */}
      <div className="fixed top-6 right-8 z-50 flex items-center gap-4 animate-fade-in">
        <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/5">
          <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider">
            <GlobalOutlined />
            <span>EN</span>
          </button>
          <div className="w-px h-3 bg-white/20"></div>
          <button className="text-gray-300 hover:text-white transition-colors text-xs font-bold">
            USD
          </button>
        </div>

        <button
          onClick={() => setLoginModalVisible(true)}
          className="px-6 py-2.5 rounded-full text-white font-bold text-sm bg-gradient-main hover:brightness-110 transition-all shadow-magenta-glow hover:scale-105 active:scale-95"
        >
          Sign Up
        </button>
      </div>

      <LoginModal
        visible={loginModalVisible}
        onClose={() => setLoginModalVisible(false)}
      />
    </>
  )
}

export default Header


import React from 'react'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './style.css'

interface SearchBarProps {
    placeholder?: string
    onSearch?: (value: string) => void
    size?: 'large' | 'middle' | 'small'
}

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = 'Search for game names or keywords',
    onSearch,
    size = 'large',
}) => {
    return (
        <div className="search-bar-wrapper">
            <Input
                size={size}
                placeholder={placeholder}
                prefix={<SearchOutlined className="search-icon" />}
                onPressEnter={(e) => onSearch?.(e.currentTarget.value)}
                className="search-bar-input"
            />
        </div>
    )
}

export default SearchBar

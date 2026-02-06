import React from "react";
import "./style.css";

interface SearchBarProps {
  placeholder?: string;
  onChange?: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search for game names or keywords",
  onChange,
}) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-white">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <input
        onChange={(e) => onChange?.(e.target.value)}
        type="text"
        placeholder={placeholder}
        className="w-full bg-black border border-white rounded-full py-2.5 pl-12 pr-12 text-sm text-white focus:outline-none focus:border-white transition-colors"
      />
    </div>
  );
};

export default SearchBar;

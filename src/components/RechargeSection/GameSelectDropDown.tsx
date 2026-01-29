import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";

type SelectDropDownProps = {
  onChange: (value: any) => void;
  label: string;
  name: string;
  options: any[];
  keyName: string;
};

const GameSelectDropDown: React.FC<SelectDropDownProps> = ({
  onChange,
  label,
  options,
  name,
  keyName,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  function handleClickOutside(event: MouseEvent) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <label className="text-sm text-white mb-2 block font-medium">
        {label}
      </label>
      <div className="relative" ref={dropdownRef}>
        <div
          className="bg-[#2e2e36] rounded-lg p-3 flex justify-between items-center cursor-pointer hover:border-white/20 transition-colors"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className="text-sm text-white">{name}</span>
          <span className="text-white text-xs">
            <DownOutlined />
          </span>
        </div>
        {showDropdown && (
          <div className="absolute top-full left-0 w-full mt-1 bg-[#2e2e36] rounded-lg shadow-xl z-20 overflow-hidden">
            {options.map((option) => (
              <div
                key={option[keyName]}
                className="px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                onClick={() => {
                  onChange(option);
                  setShowDropdown(false);
                }}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default GameSelectDropDown;

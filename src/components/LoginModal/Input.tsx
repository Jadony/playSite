type InputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
  svgEl: React.ReactNode;
};

const Input: React.FC<InputProps> = ({
  onChange,
  value,
  placeholder,
  svgEl,
}) => {
  return (
    <div className="relative">
      <div className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-white">
        {svgEl}
      </div>
      <input
        onChange={onChange}
        value={value}
        type="text"
        placeholder={placeholder}
        className="login-input w-full bg-black border border-white rounded-full py-3.5 pl-12 pr-12 text-base text-white focus:outline-none focus:border-white transition-colors"
      />
    </div>
  );
};

export default Input;

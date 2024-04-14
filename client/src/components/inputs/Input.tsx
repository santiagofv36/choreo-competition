import React from 'react';
import SearchIcon from '../icons/SearchIcon';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  placeholder?: string;
  isSearch?: boolean;
}

const Input = ({
  value,
  onChange,
  variant = 'primary',
  className,
  placeholder,
  isSearch = true,
  ...props
}: InputProps) => {
  return (
    <div className="relative">
      <input
        {...props}
        type="text"
        className={` ${className} rounded-full px-4 py-2 w-full ${
          variant === 'primary'
            ? 'bg-quintiarty text-white placeholder:text-white/50'
            : 'bg-white text-text-color placeholder:text-gray-700/50'
        } border border-border-color text-text-color focus:ring-0  bg-transparent focus:outline-none focus:shadow-none `}
        placeholder={placeholder ?? 'Search'}
        value={value}
        onChange={onChange}
      />
      {isSearch && (
        <div
          className={`size-[35px] ${
            variant === 'primary' ? 'bg-quartiarty' : 'bg-gray-500'
          } absolute right-2 top-1 rounded-full focus:outline-none`}
        >
          <SearchIcon
            className="absolute right-[6px] top-2 size-[20px] text-white rounded-full
            "
          />
        </div>
      )}
    </div>
  );
};

export default Input;

import React from 'react';
import Search from '../icons/Search';

export default function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (_value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState(initialValue);
  const timeoutRef = React.useRef<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onChange(newValue);
    }, debounce) as unknown as number;
  };

  React.useEffect(() => {
    setValue(initialValue);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [initialValue]);

  return (
    <div className="w-full rounded flex items-center gap-4 relative">
      <Search className="w-5 h-5 text-neutral-400 absolute ml-2" />
      <input
        value={value}
        onChange={handleChange}
        {...props}
        ref={inputRef}
        className="rounded-full px-4 py-2 w-full pl-10 border border-border-color text-text-color focus:ring-0  bg-transparent focus:outline-none focus:shadow-none disabled:bg-gray-200 disabled:cursor-not-allowed disabled:placeholder-gray-500 disabled:text-gray-500"
      />
    </div>
  );
}

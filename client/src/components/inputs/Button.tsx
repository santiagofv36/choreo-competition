interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'primary' | 'secondary';
  onClick: () => void;
  text: string;
}

export default function Button({
  className = '',
  onClick,
  text,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${className} w-full px-4 py-2 rounded-full ${
        variant === 'primary'
          ? 'bg-primary text-white'
          : 'bg-white text-primary'
      } focus:outline-none focus:shadow-none ${
        variant === 'primary'
          ? 'hover:bg-white hover:text-primary'
          : 'hover:bg-primary hover:text-white'
      } transition-all duration-300 ease-in-out font-semibold text-sm lg:text-base border border-primary`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

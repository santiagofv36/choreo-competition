import React from 'react';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  placeholder?: string;
}

const TextArea = ({
  value,
  onChange,
  className,
  placeholder,
  ...props
}: TextAreaProps) => {
  return (
    <textarea
      {...props}
      className={` ${className} rounded-xl px-4 py-2 w-full bg-white placeholder:text-gray-700/50
       border border-border-color text-text-color focus:ring-0  bg-transparent focus:outline-none focus:shadow-none `}
      placeholder={placeholder ?? 'Write something...'}
      value={value}
      onChange={onChange}
      cols={30}
      rows={10}
    />
  );
};

export default TextArea;

import React from 'react';

interface FilterCardProps {
  title: string;
  options: string[];
}

export default function FilterCard({
  title,
  options,
}: FilterCardProps): JSX.Element {
  return (
    <div className="flex flex-col gap-4 border border-border-color p-4 rounded-md shadow-md w-full">
      <h1 className="text-base font-regular">
        {' '}
        <span className="font-bold text-xl">|</span> {title}
      </h1>
      <ul className="flex flex-col gap-2">
        {options.map((option, idx) => (
          <div className="flex gap-8" key={idx}>
            <input type="checkbox" />
            <li key={option} className="text-sm font-thin">
              {option}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

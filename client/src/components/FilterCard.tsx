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
    <div className="flex flex-col gap-4">
      <h1 className="text-sm font-bold">{title}</h1>
      <ul className="flex flex-col gap-2">
        {options.map((option) => (
          <li key={option} className="text-sm">
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

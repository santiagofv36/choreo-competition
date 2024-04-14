import React from 'react';

interface StarSelectorProps {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

export default function StarSelector({ rating, setRating }: StarSelectorProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => {
            if (rating === idx + 1 && idx === 0) return setRating(0);
            setRating(idx + 1);
          }}
          className="focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={idx + 1 <= rating ? '#f7c948' : '#95a9a688'}
            width="24"
            height="24"
          >
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17.6 5.8 21.3l2.4-7.4L2 9.4h7.6z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

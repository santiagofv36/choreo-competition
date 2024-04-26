import { Star, StarHalf } from 'lucide-react';
import { Review } from '../../app/api/models';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="flex flex-col justify-start gap-4 w-full border border-border-color bg-white p-5 rounded-xl shadow-xl">
      <div className="flex justify-between w-full">
        <div className="flex gap-4 items-center">
          <img
            src={review?.user?.image ?? 'https://via.placeholder.com/150'}
            alt={review?.user?.name}
            className="w-10 h-10 rounded-full"
          />
          <span className="text-lg font-bold">{review?.user?.name}</span>
        </div>
        <div className="flex relative gap-1 items-center">
          {Array.from({ length: 5 }, () => (
            <Star fill="#95a9a688" size={19} className="text-transparent" />
          ))}
          <div className="flex gap-1 absolute top-[10.5px]">
            {Array.from(
              {
                length:
                  Math.floor(review?.rating ?? 0) > 5
                    ? 5
                    : Math.floor(review?.rating ?? 0),
              },
              (_, idx) => (
                <Star
                  fill="#f7c948"
                  size={19}
                  key={idx}
                  className="text-transparent"
                />
              )
            )}
            {(review?.rating ?? 0) <= 5 && (review?.rating ?? 0) % 1 >= 0.5 && (
              <StarHalf fill="#f7c948" size={19} className="text-transparent" />
            )}
          </div>
        </div>
      </div>
      <span className="text-primary/90 pl-12">{review?.review_String}</span>
    </div>
  );
}

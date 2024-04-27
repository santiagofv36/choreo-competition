import React from 'react';
import toast from 'react-hot-toast';
import TextArea from '@/components/inputs/TextArea';
import StarSelector from '@/components/inputs/StarSelector';
import Button from '@/components/inputs/Button';

export default function ReviewForm() {
  const [reviewContent, setReviewContent] = React.useState<string>('');

  const [rating, setRating] = React.useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewContent || !rating) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Review submitted successfully');
    resetForm();
  };

  const resetForm = () => {
    setReviewContent('');
    setRating(0);
  };

  return (
    <form
      className="flex gap-4 flex-col lg:w-3/4 items-center bg-white border border-border-color rounded-xl shadow-xl p-5 h-full"
      onSubmit={handleSubmit}
    >
      <h2 className="text-primary text-2xl font-bold">
        Tell us your opinion about this product!
      </h2>
      <TextArea
        placeholder="Write your review"
        className="min-h-48 max-h-96"
        onChange={(e) => setReviewContent(e.target.value)}
        value={reviewContent}
      />
      <div className="flex gap-4">
        <span className="text-primary text-lg font-bold">Rating:</span>
        <StarSelector rating={rating} setRating={setRating} />
      </div>
      <Button variant="primary" text="Submit Review" onClick={() => {}} />
    </form>
  );
}

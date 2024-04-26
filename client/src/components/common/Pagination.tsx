import { Pagination as PaginationModel } from '../../app/api/models';

interface PaginationProps<T> {
  pagination: PaginationModel<T>;
  setPagination: React.Dispatch<React.SetStateAction<PaginationModel<T>>>;
}

export function Pagination<Review>({
  pagination,
  setPagination,
}: PaginationProps<Review>) {
  return (
    <div className="flex justify-center items-center gap-4">
      <button
        className="bg-primary text-white px-4 py-2 rounded-lg disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
        onClick={() =>
          setPagination({
            ...pagination,
            page: (pagination?.page ?? 1) - 1,
          })
        }
        disabled={!pagination.hasPrev}
      >
        Prev
      </button>

      <span className="font-bold text-md flex gap-3 flex-col">
        Showing{' '}
        {(pagination?.page ?? 1) === 1
          ? 1
          : ((pagination?.page ?? 1) - 1) * (pagination?.perPage ?? 4) + 1}
        -
        {Math.min(
          (pagination?.page ?? 1) * (pagination?.perPage ?? 5),
          pagination?.itemCount ?? 0
        )}{' '}
        of {pagination?.itemCount} item{(pagination?.itemCount ?? 0) > 1 && 's'}
      </span>

      <button
        className="bg-primary text-white px-4 py-2 rounded-lg disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
        onClick={() =>
          setPagination({
            ...pagination,
            page: (pagination?.page ?? 0) + 1,
          })
        }
        disabled={!pagination.hasNext}
      >
        Next
      </button>
    </div>
  );
}

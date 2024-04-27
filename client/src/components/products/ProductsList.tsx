import { Product } from '@/app/api/models';
import ProductCard from '@/components/cards/ProductCard';
import { Skeleton } from '../ui/skeleton';

interface ProductsListProps {
  products: Product[];
  title: string;
  subtitle?: string;
  rightComponent?: React.ReactNode;
  section?: {
    className?: string;
  };
  isLoading?: boolean;
}

export default function ProductsList({
  products,
  title,
  subtitle,
  section,
  rightComponent,
  isLoading = false,
}: ProductsListProps) {
  return (
    <section
      className={`w-full p-5 flex flex-col gap-4 lg:px-48 md:px-32 ${
        section?.className ?? ''
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-primary">{title}</h2>
          {subtitle && (
            <span className="text-sm text-secondary">{subtitle}</span>
          )}
        </div>
        {rightComponent}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <Skeleton className="w-full lg:w-80 lg:h-96 rounded-xl" />
                <Skeleton className="w-1/2" />
                <div className="flex gap-4 items-center">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-1/2 h-8 rounded-full" />
                </div>
              </div>
            ))
          : products?.map((product, idx) => (
              <ProductCard key={product?.id ?? idx} product={product} />
            ))}
      </div>
    </section>
  );
}

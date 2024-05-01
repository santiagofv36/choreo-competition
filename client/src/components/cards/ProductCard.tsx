import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/app/api/models';
import { CirclePlus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  return (
    <div className={`flex flex-col gap-2 relative ${className || ''}`}>
      {product?.discount_percentage && (
        <Badge
          className="absolute top-2 left-2 px-3 py-1 rounded-md"
          variant="destructive"
        >
          -{Number(product?.discount_percentage ?? 0) * 100}%
        </Badge>
      )}
      <Link to={`/products/${product?.id}`}>
        <img
          src={product?.images[0]?.image}
          alt={product?.name}
          className="w-full lg:w-80 lg:h-96 rounded-xl"
        />
        <p className="font-bold mt-2">{product?.name}</p>
      </Link>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <span
            className={`text-sm ${
              product?.discount_percentage ? 'line-through' : ''
            }`}
          >
            ${product?.price.toFixed(2)}
          </span>
          {product?.discount_percentage && (
            <span className="text-sm">
              $
              {(
                (product.price ?? 1) * (1 - product?.discount_percentage ?? 1)
              ).toFixed(2)}
            </span>
          )}
        </div>
        <button>
          <CirclePlus strokeWidth="1px" />
        </button>
      </div>
    </div>
  );
}

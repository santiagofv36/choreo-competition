import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    images: {
      id: string;
      image: string;
    }[];
    price: number;
  };
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  console.log(product);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Link to={`/products/${product?.id}`}>
        <img
          src={product?.images[0]?.image}
          alt={product?.name}
          className="w-full lg:w-80 lg:h-96 rounded-xl"
        />
        <p className="font-bold mt-2">{product?.name}</p>
      </Link>
      <div className="flex justify-between items-center">
        <span className="text-sm">${product?.price}</span>
        <button>+</button>
      </div>
    </div>
  );
}

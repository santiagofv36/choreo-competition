interface ProductCardProps {
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col gap-2">
      <img
        src={product?.image}
        alt={product?.name}
        className="w-full lg:w-80 lg:h-96 rounded-xl"
      />
      <p className="font-bold">{product?.name}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm">${product?.price}</span>
        <button className="pr-12">+</button>
      </div>
    </div>
  );
}

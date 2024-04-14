import ProductCard from './cards/ProductCard';

interface ProductsListProps {
  products: {
    id: string;
    name: string;
    price: number;
    image: string;
  }[];
  title: string;
  subtitle?: string;
  rightComponent?: React.ReactNode;
  section?: {
    className?: string;
  };
}

export default function ProductsList({
  products,
  title,
  subtitle,
  section,
  rightComponent,
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
        {rightComponent && rightComponent}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, idx) => (
          <ProductCard key={product?.id ?? idx} product={product} />
        ))}
      </div>
    </section>
  );
}

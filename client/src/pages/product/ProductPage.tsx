import React from 'react';
import FilterCard from '@/components/cards/FilterCard';
import Input from '@/components/inputs/Input';
import ProductCard from '@/components/cards/ProductCard';
import Button from '@/components/inputs/Button';
import Layout from '@/components/layouts/Layout';

const PRODUCTS = [
  {
    id: '1',
    name: 'Product name',
    price: 100,
    images: [{ image: 'https://via.placeholder.com/150', id: '1' }],
  },
  {
    id: '2',
    name: 'Product name',
    price: 100,
    images: [{ image: 'https://via.placeholder.com/150', id: '2' }],
  },
  {
    id: '3',
    name: 'Product name',
    price: 100,
    images: [{ image: 'https://via.placeholder.com/150', id: '3' }],
  },
  {
    id: '4',
    name: 'Product name',
    price: 100,
    images: [{ image: 'https://via.placeholder.com/150', id: '4' }],
  },
];

export default function ProductPage() {
  const [search, setSearch] = React.useState('');

  const pagination = {
    page: 1,
    perPage: 12,
    itemCount: 24,
  };

  return (
    <Layout>
      <aside className=" grid grid-cols-2 gap-12 lg:flex lg:flex-col lg:gap-12 lg:w-1/5 w-full">
        <FilterCard
          title="Categories"
          options={['Beauty', 'Electronic', 'gaming']}
        />
        <FilterCard title="Price Range" options={['$10-100', '$200-500']} />
      </aside>
      <div className="flex flex-col gap-8 lg:w-4/5 w-full justify-start py-4">
        <h1 className="lg:text-4xl text-2xl font-bold text-primary ">
          Our collection of products
        </h1>
        <Input
          placeholder="Search an item"
          className="w-1/2"
          variant="secondary"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="font-bold text-md flex gap-3 flex-col">
          Showing{' '}
          {((pagination?.page ?? 1) - 1) * (pagination?.perPage ?? 4) + 1}-
          {pagination?.page * pagination?.perPage} of {pagination?.itemCount}{' '}
          item{pagination?.itemCount > 1 && 's'}
          <span className="font-light">
            This are the results based on {search}
          </span>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {PRODUCTS.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
          <span className="font-light text-md flex gap-3 flex-col">
            Showing{' '}
            {((pagination?.page ?? 1) - 1) * (pagination?.perPage ?? 4) + 1}-
            {pagination?.page * pagination?.perPage} of {pagination?.itemCount}{' '}
            item{pagination?.itemCount > 1 && 's'}
          </span>
          <Button
            variant="primary"
            className="w-40"
            onClick={() => console.log('Load more')}
            text="Load more"
          />
        </div>
      </div>
    </Layout>
  );
}

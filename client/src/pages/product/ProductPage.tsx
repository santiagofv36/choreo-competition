/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import FilterCard from '@/components/cards/FilterCard';
import Input from '@/components/inputs/Input';
import ProductCard from '@/components/cards/ProductCard';
import Button from '@/components/inputs/Button';
import Layout from '@/components/layouts/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/app/api/productSlice';
import { Product } from '@/app/api/models';

export default function ProductPage() {
  const [search, setSearch] = React.useState('');

  const products = useSelector((state: any) => state.products.products);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      fetchProducts({
        page: 1,
        perPage: 12,
      }) as any
    );
  }, [dispatch]);

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
          Showing {((products?.page ?? 1) - 1) * (products?.perPage ?? 4) + 1}-
          {products?.page * products?.perPage} of {products?.itemCount} item
          {products?.itemCount > 1 && 's'}
          <span className="font-light">
            This are the results based on {search}
          </span>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.content.map((product: Product, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
          <span className="font-light text-md flex gap-3 flex-col">
            Showing {((products?.page ?? 1) - 1) * (products?.perPage ?? 4) + 1}
            -{products?.page * products?.perPage} of {products?.itemCount} item
            {products?.itemCount > 1 && 's'}
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

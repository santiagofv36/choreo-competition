/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import FilterCard from '@/components/cards/FilterCard';
import ProductCard from '@/components/cards/ProductCard';
import Button from '@/components/inputs/Button';
import Layout from '@/components/layouts/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProducts } from '@/app/api/productSlice';
import { Product } from '@/app/api/models';
import DebouncedInput from '@/components/inputs/DebouncedInput';

export default function ProductPage() {
  const [search, setSearch] = React.useState('');

  const products = useSelector((state: any) => state.products.products);

  const loadingProducts = useSelector(
    (state: any) => state.products.loadingProducts
  );

  const categories = useSelector((state: any) => state.products.categories);

  const [category, setCategory] = React.useState('');
  const [minPrice] = React.useState(0);
  const [maxPrice] = React.useState(0);

  const [priceFilter, setPriceFilter] = React.useState<string>('');

  const PRICE_RANGES = [
    {
      id: '1',
      name: '$1-50',
    },
    {
      id: '2',
      name: '$50-100',
    },
    {
      id: '3',
      name: '$100-150',
    },
    {
      id: '4',
      name: 'Over $150',
    },
  ];

  const dispatch = useDispatch();

  React.useEffect(() => {
    const priceRange = PRICE_RANGES.find((range) => range.id === priceFilter);
    const min = parseInt(
      priceRange?.name.replace('$', '').split('-')[0] ?? '0',
      10
    );
    const max = parseInt(
      (priceRange && priceRange?.name.replace('$', '').split('-')[1]) ?? '0',
      10
    );
    dispatch(
      fetchProducts({
        page: 1,
        perPage: 12,
        search: search,
        category_id: category,
        minPrice: min,
        maxPrice: max,
      }) as any
    );
  }, [dispatch, category, maxPrice, minPrice, search, priceFilter]);

  React.useEffect(() => {
    dispatch(fetchCategories() as any);
  }, [dispatch]);

  return (
    <Layout>
      <aside className=" grid grid-cols-2 gap-12 lg:flex lg:flex-col lg:gap-12 lg:w-1/5 w-full">
        <FilterCard
          title="Categories"
          options={categories}
          option={category}
          setOption={setCategory}
        />
        <FilterCard
          title="Price Range"
          options={PRICE_RANGES}
          option={priceFilter}
          setOption={setPriceFilter}
        />
      </aside>
      <div className="flex flex-col gap-8 lg:w-4/5 w-full justify-start py-4">
        <h1 className="lg:text-4xl text-2xl font-bold text-primary ">
          Our collection of products
        </h1>
        <DebouncedInput
          placeholder="Search an item"
          className="w-1/2"
          value={search}
          disabled={loadingProducts}
          onChange={(value) => setSearch(value as string)}
        />
        <span className="font-bold text-md flex gap-3 flex-col">
          {products?.content?.length === 0 ? (
            <div className="flex justify-center items-center">
              No results were found!
            </div>
          ) : (
            <>
              Showing{' '}
              {((products?.page ?? 1) - 1) * (products?.perPage ?? 4) + 1}-
              {products?.page * products?.perPage} of {products?.itemCount} item
              {products?.itemCount > 1 && 's'}
              <span className="font-light">
                This are the results based on {search}
              </span>
            </>
          )}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products?.content?.map((product: Product, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
          {products?.content?.length !== 0 && (
            <span className="font-light text-md flex gap-3 flex-col">
              Showing{' '}
              {((products?.page ?? 1) - 1) * (products?.perPage ?? 4) + 1}-
              {products?.page * products?.perPage} of {products?.itemCount} item
              {products?.itemCount > 1 && 's'}
            </span>
          )}
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

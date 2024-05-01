/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import FilterCard from '@/components/cards/FilterCard';
import Button from '@/components/inputs/Button';
import Layout from '@/components/layouts/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProducts } from '@/app/api/productSlice';
import { Product } from '@/app/api/models';
import DebouncedInput from '@/components/inputs/DebouncedInput';
import ProductsList from '@/components/products/ProductsList';

const usePriceRange = (priceFilter: string) => {
  const PRICE_RANGES = [
    {
      id: 'e02cfdf1-409f-4ab7-9239-b04d5cf6fd63',
      name: '$1-50',
    },
    {
      id: '955a8ca5-477e-4846-8b33-b076d53008f0',
      name: '$50-100',
    },
    {
      id: '9d7d6944-b50e-47dc-b525-271484552eae',
      name: '$100-150',
    },
    {
      id: '272bb69f-96f1-467d-9f47-3e60d0e0b162',
      name: 'Over $150',
    },
  ];
  const priceRange = PRICE_RANGES.find((range) => range.id === priceFilter);
  const min = parseInt(
    priceRange?.name.replace('$', '').split('-')[0] ?? '0',
    10
  );
  const max = parseInt(
    (priceRange && priceRange?.name.replace('$', '').split('-')[1]) ?? '0',
    10
  );

  return { min, max, PRICE_RANGES };
};

export default function ProductPage() {
  const searchParams = new URLSearchParams(location.search);
  const [search, setSearch] = React.useState(searchParams.get('q') ?? '');

  const products = useSelector((state: any) => state.products.products);

  const loadingProducts = useSelector(
    (state: any) => state.products.loadingProducts
  );

  const categories = useSelector((state: any) => state.products.categories);
  const [priceFilter, setPriceFilter] = React.useState<string>(
    searchParams.get('range') ?? ''
  );
  const { min, max, PRICE_RANGES } = usePriceRange(priceFilter);

  const [category, setCategory] = React.useState(searchParams.get('cat') ?? '');

  const dispatch = useDispatch();

  const setSearchParams = () => {
    if (search) {
      searchParams.set('q', search);
    }
    if (category) {
      searchParams.set('cat', category);
    }
    if (min) {
      searchParams.set('range', priceFilter);
    }
  };

  const clearSearchParams = () => {
    if (!search) {
      searchParams.delete('q');
      history.pushState(
        {},
        '',
        `${location.pathname}?${searchParams.toString()}`
      );
    }
    if (!category) {
      searchParams.delete('cat');
      history.pushState(
        {},
        '',
        `${location.pathname}?${searchParams.toString()}`
      );
    }
    if (!min) {
      searchParams.delete('range');
      history.pushState(
        {},
        '',
        `${location.pathname}?${searchParams.toString()}`
      );
    }
    if (searchParams.size === 0) {
      history.pushState({}, '', `${location.pathname}`);
    }
  };

  React.useEffect(() => {
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

    // change the url query params
    setSearchParams();

    if (searchParams.size > 0) {
      history.pushState(
        {},
        '',
        `${location.pathname}?${searchParams.toString()}`
      );
    }

    clearSearchParams();
  }, [dispatch, category, search, priceFilter]);

  React.useEffect(() => {
    dispatch(fetchCategories() as any);
    window.scrollTo(0, 0);
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
          {products?.content?.length === 0 && !loadingProducts ? (
            <div className="flex justify-center items-center">
              No results were found!
            </div>
          ) : (
            <>
              Showing{' '}
              {((products?.page ?? 1) - 1) * (products?.perPage ?? 12) + 1}-
              {(products?.page ?? 1) * (products?.perPage ?? 12)} of{' '}
              {products?.itemCount} item
              {products?.itemCount > 1 && 's'}
              <span className="font-light">
                This are the results based on {search}
              </span>
            </>
          )}
        </span>
        <ProductsList
          products={products?.content as Product[]}
          title=""
          isLoading={loadingProducts}
          loadingQuantity={12}
          section={{ className: 'xl:px-0 -mt-14 gap-8' }}
          grid={{ className: 'gap-8' }}
        />
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
